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
} from 'antd';
import { EditFilled, DeleteFilled, ReadFilled } from '@ant-design/icons';
import AddNewAssignmentModal from 'Components/Modal/AddNewAssignmentModal';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import { getAssignmentList, addAssignment } from 'Service/Assignment';
import { PENUGASAN, MATERI } from 'Constants/assignmentConst';

import './Assignment.scss';

const { Column } = Table;

export default function Assignment() {
	const [assignmentData, setAssignmentData] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		page: 1,
		dataCount: 1,
	});
	const [isFormModalVisible, openFormModal, closeFormModal] = useModal();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();

	const [form] = Form.useForm();

	async function getAssignment() {
		showFetchLoading();

		try {
			const {
				data: {
					Contents: { DataCount, Data },
				},
			} = await getAssignmentList({ Page: pageProperty.page });

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

	useEffect(() => {}, []);

	function handleOpen() {
		openFormModal();
	}

	function handleClose() {
		closeFormModal();
		form.resetFields();
	}

	function handleChangePage() {}

	function addNewAssignment() {
		form.validateFields().then(async (values) => {
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
		});
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
						total: pageProperty.dataCount,
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
						render={(status) => <Switch loading={false} checked={status} />}
					/>
					<Column
						title="Aksi"
						key="action"
						render={() => (
							<Space size="middle">
								<Button type="primary" icon={<EditFilled />}>
									Sunting
								</Button>
								<Button danger type="primary" icon={<DeleteFilled />}>
									Hapus
								</Button>
							</Space>
						)}
					/>
				</Table>
			</div>
			<AddNewAssignmentModal
				isVisible={isFormModalVisible}
				addLoading={submitLoading}
				handleCancel={handleClose}
				handleSubmit={addNewAssignment}
				formObject={form}
			/>
		</>
	);
}
