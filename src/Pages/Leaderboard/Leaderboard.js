import React, { useState, useEffect, useRef } from 'react';

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
} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import {
	CreateUserFormModal,
	CreateLeaderboardFormModal,
} from 'Components/Modal/LeaderboardFormModal';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

import { getLeaderboards, addLeaderboard } from 'Service/Leaderboard';

const { Column } = Table;
const { Title } = Typography;

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

	useEffect(() => {
		if (firstLoad.current) firstLoad.current = false;

		getLeaderboardsData();
	}, []);

	function handleOpenLeaderboardModal() {
		showLeaderboardFormModal();
	}

	function handleOpenLeaderboardUserModal() {
		showLeaderboardUserFormModal();
	}

	function handleCloseLeaderboardModal() {
		LeaderboardForm.resetFields();
		hideLeaderboardFormModal();
	}

	function handleCloseUserModal() {
		LeaderboardUserForm.resetFields();
		hideLeaderboardFormModal();
	}

	function handleSubmitNewLeaderboard(val) {
		console.log(val);
	}

	function handleSelectLeaderboard(leaderboard) {
		const { Users } = leaderboard;

		setUsers(Users);
		setSelectedLeaderboard(leaderboard);
	}

	function handleLeaderboardSwitch(event, { LeaderboardId, IsPublish }) {
		event.stopPropagation();
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
								onClick={handleOpenLeaderboardModal}
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
							<Column title="Tanggal" dataIndex="Date" key="Date" />
							<Column
								title="Action"
								key="action"
								render={(text, { LeaderboardId, IsPublish }) => (
									<Switch
										checked={IsPublish}
										onClick={(checkStatus, e) =>
											handleLeaderboardSwitch(e, {
												LeaderboardId,
												IsPublish: checkStatus,
											})
										}
									/>
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
							<Column
								title="Action"
								key="action"
								render={(text, record) => <Switch />}
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
				handleSubmit={handleSubmitNewLeaderboard}
				formObject={LeaderboardForm}
			/>
			<CreateUserFormModal
				isVisible={isLeaderboardUserFormModalVisible}
				isEdit={isEdit}
				addLoading={submitLoading}
				handleCancel={handleCloseUserModal}
				handleSubmit={handleSubmitNewLeaderboard}
				formObject={LeaderboardUserForm}
			/>
		</>
	);
}
