import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
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
	KeyOutlined,
	// ExclamationCircleOutlined,
} from '@ant-design/icons';
import UserModal from 'Components/Modal/UserModal';
import './User.scss';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import {
	addUser,
	getUserList,
	editUserProfile,
	switchIsActive,
	UpdateUserPassword,
} from 'Service/User';

const { Column } = Table;
// const { confirm } = Modal;

export default function User() {
	const history = useHistory();
	const [firstLoad, setFirstLoad] = useState(true);
	const [userData, setUserData] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});
	const [modalType, setModalType] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);

	const [isFormModalVisible, openFormModal, closeFormModal] = useModal();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [switchLoading, showSwitchLoading, hideSwitchLoading] = useLoading();

	const [form] = Form.useForm();

	async function getUser() {
		showFetchLoading();

		try {
			const {
				data: {
					Users: { DataCount, Data },
				},
			} = await getUserList({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setUserData([...Data]);
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
		getUser();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getUser();
	}, [pageProperty.current, setPageProperty]);

	function handleOpen() {
		openFormModal();
		setModalType('new');
	}

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
	}

	function handleClose() {
		if (modalType !== '') setModalType('');

		closeFormModal();
		form.resetFields();
	}

	function handleEdit(user) {
		setSelectedUser(user);
		setModalType('edit');

		form.setFieldsValue(user);

		openFormModal();
	}

	function handleSetPassword() {
		setModalType('setPassword');
		openFormModal();
	}

	function handleSubmit() {
		form.validateFields().then((values) => {
			if (modalType === 'edit') {
				let tempVal = {
					...selectedUser,
					...values,
				};

				return editExistingUser(tempVal);
			}

			if (modalType === 'setPassword') {
				let tempVal = {
					...values,
				};

				return updatePasswordUser(tempVal);
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

			Message.success('Pengguna berhasil diubah');
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
			Message.success('Pengguna berhasil ditambahkan');
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
			Message.success('Pengguna berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function updatePasswordUser(values) {
		showSubmitLoading();
		try {
			await UpdateUserPassword({ ...values });

			getUser();

			form.resetFields();
			closeFormModal();
			Message.success('Password anda berhasil diubah');
			onLogout();
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

	function onLogout() {
		Cookies.remove('MPKMB_ADMIN_TOKEN');

		setTimeout(() => {
			alert('Anda telah mengganti password silahkan login ulang');
			history.push('/');
		});
	}

	return (
		<>
			<PageHeader title="Menejemen Pengguna" />
			<div className="assignment-table-container">
				<Row className="assignment-add-container" align="middle" justify="end">
					<Button
						className="mr-5"
						type="primary"
						icon={<UserAddOutlined />}
						onClick={handleOpen}
					>
						Tambah Pengguna
					</Button>
					<Button
						danger
						type="primary"
						icon={<KeyOutlined />}
						onClick={() => handleSetPassword()}
					>
						Ganti Password Anda
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
								checked={record.IsActive}
								onChange={() => {
									handleChangeStatus(record.Id, record.IsActive);
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
							</Space>
						)}
					/>
				</Table>
			</div>
			<UserModal
				isVisible={isFormModalVisible}
				modalType={modalType}
				addLoading={submitLoading}
				handleCancel={handleClose}
				handleSubmit={handleSubmit}
				formObject={form}
			/>
		</>
	);
}
