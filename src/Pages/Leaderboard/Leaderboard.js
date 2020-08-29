import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
	PageHeader,
	Row,
	Col,
	Button,
	Table,
	Switch,
	Form,
	Empty,
	message as Message,
	Typography,
	Tooltip,
	Space,
	Upload,
	Modal,
} from 'antd';
import {
	PlusCircleFilled,
	EditFilled,
	UploadOutlined,
	DeleteFilled,
	ExclamationCircleOutlined,
} from '@ant-design/icons';

import {
	CreateUserFormModal,
	CreateLeaderboardFormModal,
} from 'Components/Modal/LeaderboardFormModal';
import { parseDate } from 'Utils/date';
import { extractJSON } from 'Utils/readExcel';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import {
	getLeaderboards,
	addLeaderboard,
	editLeaderboard,
	addLeaderboardUsers,
	getLeaderboardUsers,
	deleteLeaderboardUser,
} from 'Service/Leaderboard';

const { Column } = Table;
const { Title, Text } = Typography;
const { confirm } = Modal;

function LeaderboardUserUpload({ file, addFile, uploadFile, uploadLoading }) {
	return (
		<>
			<Upload
				accept=".xlsx"
				showUploadList={false}
				beforeUpload={(file) => {
					addFile(file);
					return false;
				}}
			>
				<Button>
					<UploadOutlined /> Pilih file excel untuk diunggah
				</Button>
			</Upload>
			<Button
				loading={uploadLoading}
				type="primary"
				style={{ marginTop: 16 }}
				onClick={uploadFile}
			>
				Unggah File Excel
			</Button>
			{file ? (
				<Text style={{ display: 'block', marginTop: 10 }}>{file.name}</Text>
			) : (
				''
			)}
		</>
	);
}

export default function Leaderboard() {
	const [leaderboards, setLeaderboards] = useState([]);
	const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);
	const [usersFile, setUsersFile] = useState(null);
	const [users, setUsers] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const firstLoad = useRef(true);

	const [
		isLeaderboardFormModalVisible,
		showLeaderboardFormModal,
		hideLeaderboardFormModal,
	] = useModal();
	const [
		isLeaderboardUserFormModalVisible,
		showLeaderboardUserFormModal,
		hideLeaderboardUserFormModal,
	] = useModal();

	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [
		usersFetchLoading,
		showUsersFetchLoading,
		hideUsersFetchLoading,
	] = useLoading();
	const [
		parseExcelLoading,
		showParseExcelLoading,
		hideParseExcelLoading,
	] = useLoading();

	const [LeaderboardForm] = Form.useForm();
	const [LeaderboardUserForm] = Form.useForm();

	async function getLeaderboardsData() {
		showFetchLoading();
		try {
			const {
				data: { Leaderboards },
			} = await getLeaderboards();

			setLeaderboards([...Leaderboards]);
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideFetchLoading();
		}
	}

	async function createNewLeaderboard(values) {
		showSubmitLoading();
		try {
			const res = await addLeaderboard(values);

			LeaderboardForm.resetFields();
			hideLeaderboardFormModal();

			getLeaderboardsData();

			Message.success('Leaderboard berhasil dibuat.');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function editExistingLeaderboard(values) {
		showSubmitLoading();
		try {
			const res = await editLeaderboard(values);

			LeaderboardForm.resetFields();
			hideLeaderboardFormModal();

			getLeaderboardsData();

			Message.success('Leaderboard berhasil diubah.');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function fetchLeaderboardUsers(LeaderboardId) {
		showUsersFetchLoading();
		try {
			const {
				data: {
					LeaderboardUsers: { Users },
				},
			} = await getLeaderboardUsers({ LeaderboardId });

			setUsers([...Users]);
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideUsersFetchLoading();
		}
	}

	async function removeLeaderboardUser(LeaderboardUserId) {
		showUsersFetchLoading();
		try {
			let newUsers = [...users];

			const index = newUsers.findIndex(
				(item) => LeaderboardUserId === item.LeaderboardUserId
			);

			if (index === -1) return;

			newUsers.splice(index, 1);

			const res = await deleteLeaderboardUser({ LeaderboardUserId });

			setUsers([...newUsers]);
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideUsersFetchLoading();
		}
	}

	useEffect(() => {
		if (firstLoad.current) firstLoad.current = false;

		getLeaderboardsData();
	}, []);

	function handleCloseLeaderboardModal() {
		LeaderboardForm.resetFields();
		hideLeaderboardFormModal();

		setSelectedLeaderboard(null);
	}

	function handleCloseUserModal() {
		LeaderboardUserForm.resetFields();
		hideLeaderboardFormModal();
	}

	function handleSubmitLeaderboardForm() {
		LeaderboardForm.validateFields().then((formValue) => {
			let { Date } = formValue;

			let values = {
				...formValue,
				Date: Date.format('YYYY-MM-DD'),
			};

			if (isEdit) {
				let editedVal = {
					...selectedLeaderboard,
					...values,
				};

				return editExistingLeaderboard(editedVal);
			}

			return createNewLeaderboard(values);
		});
	}

	function handleSelectLeaderboard(leaderboard) {
		const { Users } = leaderboard;

		setUsers(Users);
		setSelectedLeaderboard(leaderboard);
	}

	function handleLeaderboardSwitch(event, leaderboard) {
		event.stopPropagation();

		const { IsPublish, Date } = leaderboard;

		let newValue = {
			...leaderboard,
			Date: moment(parseDate(Date)),
			IsPublish: !IsPublish,
		};

		editExistingLeaderboard(newValue);
	}

	function handleEditLeaderboard(leaderboard) {
		let temp = {
			...leaderboard,
			Date: moment(parseDate(leaderboard.Date)),
		};

		setIsEdit(true);
		setSelectedLeaderboard(temp);

		LeaderboardForm.setFieldsValue(temp);
		showLeaderboardFormModal();
	}

	function handleAddFile(file) {
		setUsersFile(file);
	}

	async function handleUploadExcelFile() {
		if (!usersFile) {
			Message.warn(
				'Tidak ada file untuk diunggah. Silahkan pilih terlebih dahulu.'
			);
			return;
		}

		showParseExcelLoading();

		const { LeaderboardId } = selectedLeaderboard;

		try {
			await extractJSON(usersFile).then(async (data) => {
				const res = await addLeaderboardUsers({ LeaderboardId, Users: data });

				Message.success('Data peringkat berhasil diunggah.');

				fetchLeaderboardUsers(LeaderboardId);
			});
		} catch (e) {
			Message.error(e);
		} finally {
			hideParseExcelLoading();
		}
	}

	function handleDeleteUser(LeaderboardUserId) {
		confirm({
			title: 'Apakah Anda yakin?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Ya',
			okType: 'danger',
			cancelText: 'Batalkan',
			onOk() {
				removeLeaderboardUser(LeaderboardUserId);
			},
			onCancel() {},
		});
	}

	return (
		<>
			<PageHeader title="Leaderboard" />
			<div style={{ padding: 32 }}>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col span={12}>
						<Row style={{ paddingBottom: 15 }} align="middle" justify="end">
							<Button
								type="primary"
								icon={<PlusCircleFilled />}
								onClick={showLeaderboardFormModal}
							>
								Tambah Leaderboard baru
							</Button>
						</Row>
						<Table
							rowSelection={{
								selections: true,
								type: 'radio',
								onSelect: (record) => handleSelectLeaderboard(record),
							}}
							pagination={false}
							rowKey="LeaderboardId"
							dataSource={leaderboards}
							loading={fetchLoading}
							locale={{
								emptyText: (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description="Silahkan buat leaderboard terlebih dahulu"
									/>
								),
							}}
						>
							<Column title="Judul" dataIndex="Title" key="Title" />
							<Column
								title="Deskripsi"
								dataIndex="Description"
								key="Description"
							/>
							<Column
								title="Tanggal"
								dataIndex="Date"
								key="Date"
								render={(text, record) => <Text>{parseDate(record.Date)}</Text>}
							/>
							<Column
								key="action"
								render={(text, record) => (
									<Space size="middle">
										<Switch
											loading={submitLoading}
											checked={record.IsPublish}
											onClick={(checkStatus, e) =>
												handleLeaderboardSwitch(e, record)
											}
										/>
										<Tooltip title="Sunting">
											<Button
												onClick={() => handleEditLeaderboard(record)}
												type="primary"
												shape="circle"
												icon={<EditFilled />}
											/>
										</Tooltip>
									</Space>
								)}
							/>
						</Table>
					</Col>
					<Col span={12}>
						<Row style={{ paddingBottom: 10 }} align="middle" justify="center">
							<Title level={4}>Peringkat Peserta</Title>
						</Row>
						<Table
							dataSource={users}
							pagination={false}
							rowKey="LeaderboardUserId"
							locale={{
								emptyText: selectedLeaderboard ? (
									<LeaderboardUserUpload
										addFile={handleAddFile}
										uploadFile={handleUploadExcelFile}
										file={usersFile}
										uploadLoading={parseExcelLoading}
									/>
								) : (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description="Silahkan pilih leaderboard terlebih dahulu"
									/>
								),
							}}
							loading={usersFetchLoading}
						>
							<Column title="Ranking" dataIndex="Rank" key="Rank" />
							<Column title="Nama" dataIndex="Name" key="Name" />
							<Column title="NIM" dataIndex="NIM" key="NIM" />
							<Column title="Poin" dataIndex="Point" key="Point" />
							<Column
								key="action"
								render={(text, { LeaderboardUserId }) => (
									<Tooltip title="Hapus">
										<Button
											onClick={() => handleDeleteUser(LeaderboardUserId)}
											type="primary"
											shape="circle"
											icon={<DeleteFilled />}
											danger
										/>
									</Tooltip>
								)}
							/>
						</Table>
					</Col>
				</Row>
			</div>
			<CreateLeaderboardFormModal
				isVisible={isLeaderboardFormModalVisible}
				isEdit={isEdit}
				addLoading={submitLoading}
				handleCancel={handleCloseLeaderboardModal}
				handleSubmit={handleSubmitLeaderboardForm}
				formObject={LeaderboardForm}
			/>
			<CreateUserFormModal
				isVisible={isLeaderboardUserFormModalVisible}
				isEdit={isEdit}
				addLoading={submitLoading}
				handleCancel={handleCloseUserModal}
				handleSubmit={handleSubmitLeaderboardForm}
				formObject={LeaderboardUserForm}
			/>
		</>
	);
}

LeaderboardUserUpload.propTypes = {
	file: PropTypes.object,
	addFile: PropTypes.func.isRequired,
	uploadFile: PropTypes.func.isRequired,
	uploadLoading: PropTypes.bool,
};
