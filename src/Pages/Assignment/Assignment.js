import React, { useState, useEffect } from 'react';
import {
	PageHeader,
	Table,
	Tag,
	Space,
	Button,
	Switch,
	Row,
	Form,
	message as Message,
	Modal,
} from 'antd';
import {
	EditFilled,
	DeleteFilled,
	ReadFilled,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import AddNewAssignmentModal from 'Components/Modal/AddNewAssignmentModal';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import {
	getAssignmentList,
	addAssignment,
	deleteAssignment,
	editAssignment,
	switchPublish,
} from 'Service/Assignment';
import { PENUGASAN, MATERI } from 'Constants/assignmentConst';

import './Assignment.scss';

const { Column } = Table;
const { confirm } = Modal;

export default function Assignment() {
	const [firstLoad, setFirstLoad] = useState(true);
	const [assignmentData, setAssignmentData] = useState([]);
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

	async function getAssignment() {
		showFetchLoading();

		try {
			const {
				data: {
					Contents: { DataCount, Data },
				},
			} = await getAssignmentList({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setAssignmentData([...Data]);
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
		getAssignment();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getAssignment();
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

	function handleEdit(assignment) {
		setSelectedAssignment(assignment);
		setIsEdit(true);

		form.setFieldsValue(assignment);

		openFormModal();
	}

	function handleSubmit() {
		form.validateFields().then((values) => {
			if (isEdit) {
				let tempVal = {
					...selectedAssignment,
					...values,
					UrlPassword:
						values.UrlPassword.length === 0 ? null : values.UrlPassword,
				};

				return editExistingAssignment(tempVal);
			}

			return addNewAssignment(values);
		});
	}

	function handleDelete(Id) {
		confirm({
			title: 'Apakah Anda yakin?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Ya',
			okType: 'danger',
			cancelText: 'Batalkan',
			onOk() {
				deleteExistingAssignment(Id);
			},
			onCancel() {},
		});
	}

	async function handleChangeStatus(Id, PublishStatus) {
		showSwitchLoading();
		try {
			const res = await switchPublish({ Id, PublishStatus: !PublishStatus });

			getAssignment();

			Message.success('Status Tugas/Materi berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSwitchLoading();
		}
	}

	async function addNewAssignment(values) {
		showSubmitLoading();
		try {
			const { data } = await addAssignment({ ...values });

			getAssignment();

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

	async function editExistingAssignment(values) {
		showSubmitLoading();
		try {
			const { data } = await editAssignment({ ...values });

			getAssignment();

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

	async function deleteExistingAssignment(Id) {
		try {
			const res = await deleteAssignment({ Id });
			getAssignment();

			Message.success('Tugas/Materi berhasil dihapus');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		}
	}

	return (
		<>
			<PageHeader title="Penugasan" />
			<div className="assignment-table-container">
				<Row className="assignment-add-container" align="middle" justify="end">
					<Button type="primary" icon={<ReadFilled />} onClick={handleOpen}>
						Tambah Tugas/Materi Baru
					</Button>
				</Row>
				<Table
					dataSource={assignmentData}
					pagination={{
						position: ['bottomCenter'],
						current: pageProperty.current,
						total: pageProperty.dataCount,
						onChange: handleChangePage,
					}}
					rowKey="Id"
					loading={fetchLoading}
				>
					<Column title="Judul Tugas" dataIndex="Title" key="Title" />
					<Column title="Kategori" dataIndex="Category" key="Category" />
					<Column
						title="Tipe"
						dataIndex="Type"
						key="Type"
						render={(type) => {
							if (type === PENUGASAN) return <Tag color="blue">Penugasan</Tag>;
							if (type === MATERI) return <Tag color="red">Materi</Tag>;
						}}
					/>
					<Column
						title="Tampilkan"
						dataIndex="PublishStatus"
						key="PublishStatus"
						render={(text, record) => (
							<Switch
								loading={switchLoading}
								checked={record.PublishStatus}
								onChange={() =>
									handleChangeStatus(record.Id, record.PublishStatus)
								}
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
			<AddNewAssignmentModal
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
