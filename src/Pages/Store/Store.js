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
} from 'antd';
import { PlusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import StoreCard from 'Components/Card/StoreCard';

import { getStoreProducts, deleteProduct, switchPublish } from 'Service/Store';

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
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();

	const [firstLoad, setFirstLoad] = useState(true);

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

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
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

	return (
		<>
			<PageHeader title="MPKMB Store" />
			<div style={{ padding: '32px' }}>
				<Row style={{ paddingBottom: 15 }} align="middle" justify="end">
					<Button type="primary" icon={<PlusCircleFilled />}>
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
					) : products ? (
						products.map((product, index) => (
							<Col key={index} className="gutter-row" span={6}>
								<StoreCard
									data={product}
									loading={fetchLoading}
									handleDelete={handleDelete}
									handleSwitch={handleChangeStatus}
								/>
							</Col>
						))
					) : (
						<Empty image={PRESENTED_IMAGE_SIMPLE} />
					)}
				</Row>
				{!fetchLoading ? (
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
		</>
	);
}
