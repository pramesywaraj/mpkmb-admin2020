import React, { useState, useEffect } from 'react';
import {
	PageHeader,
	Table,
	Space,
	Button,
	Switch,
	Row,
	Form,
	message as Message,
	// Modal,
} from 'antd';
import {
	EditFilled,
	// DeleteFilled,
	UserAddOutlined,
	// ExclamationCircleOutlined,
} from '@ant-design/icons';
import UserModal from 'Components/Modal/UserModal';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import {
	addUser,
	getUserList,
	editUserProfile,
	switchIsActive,
} from 'Service/User';

const { Column } = Table;
// const { confirm } = Modal;

export default function Assignment() {
	const [firstLoad, setFirstLoad] = useState(true);
	const [userData, setUserData] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});
	const [isEdit, setIsEdit] = useState(false);
	const [selectedAssignment, setSelectedAssignment] = useState(null);

	const [isFormModalVisible, openFormModal, closeFormModal] = useModal();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [switchLoading, showSwitchLoading, hideSwitchLoading] = useLoading();

	const [form] = Form.useForm();

	async function getUser() {
		showFetchLoading();

		try {
			const {
				data: { Users },
			} = await getUserList({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setUserData([...Users]);
			setPageProperty({
				...pageProperty,
				dataCount: 100,
			});
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideFetchLoading();
		}
	}

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getUser();
	}, [pageProperty.current, setPageProperty]);

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

	function handleEdit(user) {
		setSelectedAssignment(user);
		setIsEdit(true);

		form.setFieldsValue(user);

		openFormModal();
	}

	function handleSubmit() {
		form.validateFields().then((values) => {
			if (isEdit) {
				let tempVal = {
					...selectedAssignment,
					...values,
				};

				return editExistingUser(tempVal);
			}

			return addNewUser(values);
		});
	}

	// function handleDelete(Id) {
	// 	confirm({
	// 		title: 'Apakah Anda yakin?',
	// 		icon: <ExclamationCircleOutlined />,
	// 		okText: 'Ya',
	// 		okType: 'danger',
	// 		cancelText: 'Batalkan',
	// 		onOk() {
	// 			deleteExistingAssignment(Id);
	// 		},
	// 		onCancel() {},
	// 	});
	// }

	async function handleChangeStatus(Id, IsActive) {
		showSwitchLoading();
		try {
			await switchIsActive({ Id, IsActive: !IsActive });
			getUser();

			Message.success('Status Tugas/Materi berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSwitchLoading();
		}
	}

	async function addNewUser(values) {
		showSubmitLoading();
		try {
			await addUser({ ...values });

			getUser();

			form.resetFields();
			closeFormModal();
			Message.success('Tugas/Materi berhasil ditambahkan');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function editExistingUser(values) {
		showSubmitLoading();
		try {
			await editUserProfile({ ...values });

			getUser();

			form.resetFields();
			closeFormModal();
			Message.success('Tugas/Materi berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	// async function deleteExistingAssignment(Id) {
	// 	try {
	// 		const res = await deleteAssignment({ Id });
	// 		getAssignment();

	// 		Message.success('Tugas/Materi berhasil dihapus');
	// 	} catch (e) {
	// 		const { message } = e;
	// 		Message.error(message);
	// 	}
	// }

	return (
		<>
			<PageHeader title="Menejemen Pengguna" />
			<div className="assignment-table-container">
				<Row className="assignment-add-container" align="middle" justify="end">
					<Button
						type="primary"
						icon={<UserAddOutlined />}
						onClick={handleOpen}
					>
						Tambah Pengguna
					</Button>
				</Row>
				<Table
					dataSource={userData}
					pagination={{
						position: ['bottomCenter'],
						current: pageProperty.current,
						total: pageProperty.dataCount,
						onChange: handleChangePage,
					}}
					rowKey="Id"
					loading={fetchLoading}
				>
					<Column title="Nama Pengguna" dataIndex="Name" key="Name" />
					<Column title="Email Pengguna" dataIndex="Email" key="Email" />
					<Column
						title="Aktivasi"
						dataIndex="IsActive"
						key="IsActive"
						render={(text, record) => (
							<Switch
								loading={switchLoading}
								checked={record.IsActive === 'false' ? false : true}
								onChange={() => {
									handleChangeStatus(
										record.Id,
										record.IsActive === 'false' ? false : true
									);
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
								{/* <Button
									danger
									type="primary"
									icon={<DeleteFilled />}
									onClick={() => handleDelete(record.Id)}
								>
									Hapus
								</Button> */}
							</Space>
						)}
					/>
				</Table>
			</div>
			<UserModal
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
