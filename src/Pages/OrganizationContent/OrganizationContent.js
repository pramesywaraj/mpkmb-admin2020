import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	PageHeader,
	Table,
	Space,
	Button,
	Switch,
	Row,
	message as Message,
	Modal,
} from 'antd';
import {
	EditFilled,
	DeleteFilled,
	UserAddOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';

import useLoading from 'Hooks/useLoading';

import {
	getOrganizationContentList,
	deleteOrganizationContent,
	switchPublish,
} from 'Service/OrganizationContent';

const { Column } = Table;
const { confirm } = Modal;

export default function OrganizationContent() {
	const history = useHistory();
	const [firstLoad, setFirstLoad] = useState(true);
	const [organizationData, setOrganizationData] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});

	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [switchLoading, setSwitchLoading] = useState('');

	async function getData() {
		showFetchLoading();

		try {
			const {
				data: {
					OrganizationContents: { DataCount, Data },
				},
			} = await getOrganizationContentList({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setOrganizationData([...Data]);
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
		getData();
	}, []);

	useEffect(() => {
		if (firstLoad) return;
		getData();
	}, [pageProperty.current, setPageProperty]);

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
	}

	function handleEdit(data) {
		window.sessionStorage.setItem('editContent', JSON.stringify(data));
		history.push(`/admin/ukm-ormawa/${data.Id}/sunting`);
	}

	function handleDelete(Id) {
		confirm({
			title: 'Apakah Anda yakin?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Ya',
			okType: 'danger',
			cancelText: 'Batalkan',
			onOk() {
				deleteExistingOrganizationContent(Id);
			},
			onCancel() {},
		});
	}

	async function handleChangeStatus(Id, PublishStatus) {
		setSwitchLoading(Id);
		try {
			await switchPublish({ Id, PublishStatus: !PublishStatus });
			getData();

			Message.success('Pengguna berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			setSwitchLoading('');
		}
	}

	async function deleteExistingOrganizationContent(Id) {
		try {
			await deleteOrganizationContent({ Id });
			getData();

			Message.success('Konten Organisasi berhasil dihapus');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		}
	}

	return (
		<>
			<PageHeader title="Menejemen UKM & ORMAWA" />
			<div className="assignment-table-container">
				<Row className="assignment-add-container" align="middle" justify="end">
					<Button
						className="mr-5"
						type="primary"
						icon={<UserAddOutlined />}
						onClick={() => history.push('/admin/ukm-ormawa/tambah')}
					>
						Tambah UKM / ORMAWA
					</Button>
				</Row>
				<Table
					dataSource={organizationData}
					pagination={{
						position: ['bottomCenter'],
						current: pageProperty.current,
						total: pageProperty.dataCount,
						onChange: handleChangePage,
					}}
					rowKey="Id"
					loading={fetchLoading}
				>
					<Column title="Nama Organisasi" dataIndex="Title" key="Title" />
					<Column title="Category" dataIndex="Category" key="Category" />
					<Column
						title="Tampilkan"
						dataIndex="PublishStatus"
						key="PublishStatus"
						render={(text, record) => (
							<Switch
								loading={switchLoading === record.Id}
								checked={record.PublishStatus}
								onChange={() => {
									handleChangeStatus(record.Id, record.PublishStatus);
								}}
							/>
						)}
					/>
					<Column
						title="Aksi"
						key="action"
						render={(text, record) => (
							<Space size="middle">
								<Button
									type="primary"
									icon={<EditFilled />}
									onClick={() => handleEdit(record)}
								>
									Sunting
								</Button>
								<Button
									danger
									type="primary"
									icon={<DeleteFilled />}
									onClick={() => handleDelete(record.Id)}
								>
									Hapus
								</Button>
							</Space>
						)}
					/>
				</Table>
			</div>
		</>
	);
}
