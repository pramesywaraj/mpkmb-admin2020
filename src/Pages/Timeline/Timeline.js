import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Timeline.scss';

import {
	PageHeader,
	Table,
	Button,
	Switch,
	Row,
	Form,
	Typography,
	message as Message,
} from 'antd';
import { CalendarFilled, EditFilled } from '@ant-design/icons';

import {
	getTimeline,
	createTimeline,
	editOrSwitchTimeline,
} from 'Service/Timeline';

import AddNewTimelineModal from 'Components/Modal/AddNewTimelineModal';
import { parseDate } from 'Utils/date';

import useModal from 'Hooks/useModal';
import useLoading from 'Hooks/useLoading';

const { Column } = Table;
const { Text } = Typography;

export default function Timeline() {
	const [firstLoad, setFirstLoad] = useState(true);
	const [timelineList, setTimelineList] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTimeline, setSelectedTimeline] = useState(null);

	const [isFormModalVisible, openFormModal, closeFormModal] = useModal();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [switchLoading, showSwitchLoading, hideSwitchLoading] = useLoading();

	const [form] = Form.useForm();

	async function getTimelineList() {
		showFetchLoading();

		try {
			const {
				data: {
					ReminderDates: { DataCount, Data },
				},
			} = await getTimeline({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setTimelineList([...Data]);
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
		getTimelineList();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getTimelineList();
	}, [pageProperty.current, setPageProperty]);

	function handleClose() {
		if (isEdit) setIsEdit(false);

		closeFormModal();
		form.resetFields();
	}

	function handleOpen() {
		openFormModal();
	}

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
	}

	async function handleChangeStatus(timeline) {
		showSwitchLoading();

		const { IsPublish, Date: ReminderDate } = timeline;

		try {
			let temp = {
				...timeline,
				IsPublish: !IsPublish,
				Date: parseDate(ReminderDate),
			};

			delete temp.CreatedDate;
			delete temp.LastUpdated;

			const res = await editOrSwitchTimeline(temp);

			getTimelineList();

			Message.success('Status Tanggal Pengingat berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSwitchLoading();
		}
	}

	function handleEdit(timeline) {
		let selectedTimeline = {
			...timeline,
			Date: moment(parseDate(timeline.Date)),
		};

		setSelectedTimeline(selectedTimeline);
		setIsEdit(true);

		form.setFieldsValue(selectedTimeline);

		openFormModal();
	}

	function handleSubmit() {
		form.validateFields().then((formValue) => {
			let { Date } = formValue;

			let values = {
				...formValue,
				Date: Date.format('YYYY-MM-DD'),
			};

			if (isEdit) {
				let tempVal = {
					...selectedTimeline,
					...values,
				};

				return onEditExistingTimeline(tempVal);
			}

			return onAddNewTimeline(values);
		});
	}

	async function onEditExistingTimeline(values) {
		showSubmitLoading();
		try {
			const res = await editOrSwitchTimeline({ ...values });

			getTimelineList();

			form.resetFields();
			closeFormModal();

			Message.success('Tanggal Pengingat berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function onAddNewTimeline(values) {
		showSubmitLoading();
		try {
			const res = await createTimeline({ ...values });

			getTimelineList();

			form.resetFields();
			closeFormModal();

			Message.success('Tanggal Pengingat berhasil ditambahkan');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	return (
		<>
			<PageHeader title="Timeline" />
			<div className="timeline-table-container">
				<Row className="timeline-add-container" align="middle" justify="end">
					<Button type="primary" icon={<CalendarFilled />} onClick={handleOpen}>
						Tambah Tanggal Pengingat
					</Button>
				</Row>
				<Table
					rowKey="Id"
					dataSource={timelineList}
					pagination={{
						position: ['bottomCenter'],
						current: pageProperty.current,
						total: pageProperty.dataCount,
						onChange: handleChangePage,
					}}
					loading={fetchLoading}
				>
					<Column title="Judul" dataIndex="Title" key="Title" />
					<Column title="Deskripsi" dataIndex="Description" key="Description" />
					<Column
						title="Tanggal"
						dataIndex="Date"
						key="Date"
						render={(text, record) => <Text>{parseDate(record.Date)}</Text>}
					/>
					<Column
						title="Tampilkan"
						dataIndex="IsPublish"
						key="IsPublish"
						render={(text, record) => (
							<Switch
								loading={switchLoading}
								checked={record.IsPublish}
								onChange={() => handleChangeStatus(record)}
							/>
						)}
					/>
					<Column
						title="Aksi"
						key="action"
						render={(text, record) => (
							<Button
								type="primary"
								icon={<EditFilled />}
								onClick={() => handleEdit(record)}
							>
								Sunting
							</Button>
						)}
					/>
				</Table>
			</div>
			<AddNewTimelineModal
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
