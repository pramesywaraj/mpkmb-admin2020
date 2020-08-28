import React, { useState, useEffect } from 'react';
import './QNA.scss';
import {
	List,
	PageHeader,
	message as Message,
	Row,
	Pagination,
	Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Comment from '../../Components/Comment/Comment';
import useLoading from 'Hooks/useLoading';

import {
	getQNAList,
	switchPublish,
	editQNA,
	DeleteQNA,
} from '../../Service/QNA';

const { confirm } = Modal;

export default function QNA() {
	const [firstLoad, setFirstLoad] = useState(true);
	const [qnaData, setQnaData] = useState([]);
	const [pageProperty, setPageProperty] = useState({
		current: 1,
		dataCount: 1,
	});

	const [fetchLoading, showFetchLoading, hideFetchLoading] = useLoading();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [switchLoading, showSwitchLoading, hideSwitchLoading] = useLoading();

	async function getQNA() {
		showFetchLoading();

		try {
			const {
				data: {
					QNAs: { DataCount, Data },
				},
			} = await getQNAList({ Page: pageProperty.current });

			if (firstLoad) setFirstLoad(false);

			setQnaData([...Data]);
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
		getQNA();
	}, []);

	useEffect(() => {
		if (firstLoad) return;

		getQNA();
	}, [pageProperty.current, setPageProperty]);

	function handleChangePage(page) {
		setPageProperty({
			...pageProperty,
			current: page,
		});
	}

	async function handleReply(Id, Answer) {
		showSubmitLoading();
		try {
			await editQNA({ Id, Answer });
			Message.success('Status qna berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
			getQNA();
		}
	}

	async function handleChangeStatus(Id, PublishStatus) {
		showSwitchLoading();
		try {
			await switchPublish({ Id, PublishStatus: !PublishStatus });
			Message.success('Status qna berhasil diubah');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSwitchLoading();
			getQNA();
		}
	}

	async function deleteQNA(Id) {
		showFetchLoading();
		try {
			await DeleteQNA({ Id });
			Message.success('qna berhasil dihapus');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			getQNA();
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
				deleteQNA(Id);
			},
			onCancel() {},
		});
	}

	return (
		<>
			<PageHeader title="Question and Answer" />
			<div className="dashboard-container">
				<List
					loading={fetchLoading}
					className="comment-list"
					header={`${qnaData.length} Questions`}
					itemLayout="horizontal"
					dataSource={qnaData}
					renderItem={(item) => (
						<li className="list-qna">
							<Comment
								Id={item.Id}
								Username={item.Username}
								Question={item.Question}
								Answer={item.Answer}
								PublishStatus={item.PublishStatus}
								createdAt={item.CreatedDate}
								updatedAt={item.LastUpdated}
								submitLoading={submitLoading}
								switchLoading={switchLoading}
								handleChangeStatus={handleChangeStatus}
								handleReply={handleReply}
								handleDelete={handleDelete}
							/>
						</li>
					)}
				/>
			</div>
			{!fetchLoading && (
				<Row
					style={{ paddingTop: 20, paddingBottom: 20 }}
					align="middle"
					justify="center"
				>
					<Pagination
						current={pageProperty.current}
						total={pageProperty.dataCount}
						onChange={handleChangePage}
					/>
				</Row>
			)}
		</>
	);
}
