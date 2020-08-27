import React, { useEffect, useState } from 'react';
import {
	PageHeader,
	Row,
	Col,
	Button,
	message as Message,
	Empty,
	Pagination,
	Spin,
	Modal,
	Form,
} from 'antd';
import { PlusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import StoreCard from 'Components/Card/StoreCard';
import ProductFormModal from 'Components/Modal/ProductFormModal';

import {
	getStoreProducts,
	createNewProduct,
	deleteProduct,
	switchPublish,
	updateProduct,
} from 'Service/Store';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const PAGE_SIZE = 8;
const { confirm } = Modal;

export default function Store() {
	const [products, setProducts] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});
	const [isEdit, setIsEdit] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [isFormModalVisible, openFormModal, closeFormModal] = useModal();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [firstLoad, setFirstLoad] = useState(true);

	const [form] = Form.useForm();

	async function getProducts() {
		showFetchLoading();

		try {
			const {
				data: {
					Products: { DataCount, Data },
				},
			} = await getStoreProducts({
				Page: pageProperty.current,
				Limit: PAGE_SIZE,
			});

			if (firstLoad) setFirstLoad(false);

			setProducts([...Data]);
			setPageProperty({
				...pageProperty,
				dataCount: DataCount,
			});
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideFetchLoading();
		}
	}

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getProducts();
	}, [pageProperty.current, setPageProperty]);

	async function deleteExistingProduct(Id) {
		try {
			const res = await deleteProduct({ Id });
			getProducts();

			Message.success('Produk berhasil dihapus');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		}
	}

	async function addNewProduct(values) {
		showSubmitLoading();
		try {
			const { data } = await createNewProduct({ ...values });

			getProducts();

			form.resetFields();
			closeFormModal();

			Message.success('Produk berhasil ditambahkan');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function editProduct(values) {
		showSubmitLoading();
		try {
			const { data } = await updateProduct({ ...values });

			getProducts();

			form.resetFields();
			closeFormModal();
			Message.success('Produk berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	function handleOpen() {
		openFormModal();
	}

	function handleClose() {
		if (isEdit) setIsEdit(false);

		closeFormModal();
		form.resetFields();
	}

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
	}

	function handleEdit(product) {
		setSelectedProduct(product);
		setIsEdit(true);

		form.setFieldsValue(product);

		openFormModal();
	}

	async function handleChangeStatus(Id, PublishStatus) {
		try {
			const res = await switchPublish({ Id, PublishStatus: !PublishStatus });

			getProducts();

			Message.success('Status produk berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		}
	}

	function handleDelete(Id) {
		confirm({
			title: 'Apakah Anda yakin?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Ya',
			okType: 'danger',
			cancelText: 'Batalkan',
			onOk() {
				deleteExistingProduct(Id);
			},
			onCancel() {},
		});
	}

	function handleSubmit() {
		form.validateFields().then((values) => {
			let tempVal = {
				...selectedProduct,
				...values,
				Price: parseInt(values.Price),
			};

			if (isEdit) {
				return editProduct(tempVal);
			}

			return addNewProduct(tempVal);
		});
	}

	return (
		<>
			<PageHeader title="MPKMB Store" />
			<div style={{ padding: '32px' }}>
				<Row style={{ paddingBottom: 15 }} align="middle" justify="end">
					<Button
						type="primary"
						icon={<PlusCircleFilled />}
						onClick={handleOpen}
					>
						Tambah Produk Baru
					</Button>
				</Row>
				<Row
					gutter={{ xs: 8, sm: 8, md: 24, lg: 32 }}
					align="top"
					justify="center"
				>
					{fetchLoading ? (
						<Spin size="large" tip="Mohon tunggu..." />
					) : products.length > 0 ? (
						products.map((product, index) => (
							<Col key={index} className="gutter-row" span={6}>
								<StoreCard
									data={product}
									loading={fetchLoading}
									handleDelete={handleDelete}
									handleSwitch={handleChangeStatus}
									handleEdit={handleEdit}
								/>
							</Col>
						))
					) : (
						<Empty image={PRESENTED_IMAGE_SIMPLE} />
					)}
				</Row>
				{!fetchLoading && products ? (
					<Row style={{ paddingTop: 30 }} align="middle" justify="center">
						<Pagination
							current={pageProperty.current}
							total={pageProperty.dataCount}
							defaultPageSize={PAGE_SIZE}
							onChange={handleChangePage}
						/>
					</Row>
				) : (
					''
				)}
			</div>
			<ProductFormModal
				isVisible={isFormModalVisible}
				isEdit={isEdit}
				addLoading={submitLoading}
				handleCancel={handleClose}
				handleSubmit={handleSubmit}
				formObject={form}
			/>
		</>
	);
}
