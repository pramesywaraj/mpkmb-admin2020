import React, { useState, useEffect, useRef } from 'react';
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
} from 'antd';
import { PlusCircleFilled, EditFilled } from '@ant-design/icons';

import {
	CreateUserFormModal,
	CreateLeaderboardFormModal,
} from 'Components/Modal/LeaderboardFormModal';
import { parseDate } from 'Utils/date';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import {
	getLeaderboards,
	addLeaderboard,
	editLeaderboard,
} from 'Service/Leaderboard';

const { Column } = Table;
const { Title, Text } = Typography;

export default function Leaderboard() {
	const [leaderboards, setLeaderboards] = useState([]);
	const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);
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
			hideFetchLoading();
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
							pagination={false}
							rowKey="LeaderboardId"
							dataSource={leaderboards}
							onRow={(record, rowIndex) => {
								return {
									onClick: (e) => {
										handleSelectLeaderboard(record);
									},
								};
							}}
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
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description="No Data"
									/>
								) : (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description="Silahkan pilih leaderboard terlebih dahulu"
									/>
								),
							}}
						>
							<Column title="Ranking" dataIndex="Rank" key="Rank" />
							<Column title="Nama" dataIndex="Name" key="Name" />
							<Column title="NIM" dataIndex="NIM" key="NIM" />
							<Column title="Poin" dataIndex="Point" key="Point" />
							<Column key="action" render={(text, record) => <Switch />} />
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
