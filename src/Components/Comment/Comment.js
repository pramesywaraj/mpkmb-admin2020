import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentComponent, Avatar, Switch, Tooltip } from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	CheckOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import { formatDate } from 'Utils/date';
import CommentEditor from './CommentEditor';

function Comment({
	Id,
	Username,
	Question,
	Answer,
	PublishStatus,
	createdAt,
	updatedAt,
	submitLoading,
	switchLoading,
	handleChangeStatus,
	handleReply,
	handleDelete,
}) {
	const [showRelpies, setShowReplies] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const [selectedId, setSelectedId] = useState('');
	const [textValue, setTextValue] = useState('');
	return (
		<>
			<CommentComponent
				actions={
					!showEditor && [
						Answer && Answer !== '' ? (
							<span
								key="comment-basic-reply-to"
								onClick={() => setShowReplies(!showRelpies)}
							>
								{!showRelpies ? 'Lihat balasan' : 'Tutup'}
							</span>
						) : (
							<span
								key="comment-basic-reply-to"
								className="reply"
								onClick={() => {
									setSelectedId(Id);
									setShowEditor(!showEditor);
								}}
							>
								Balas
							</span>
						),
						<Tooltip
							key={Id}
							title={
								Answer && Answer !== ''
									? 'publish status'
									: 'silahkan balas terlebih dahulu !'
							}
						>
							<Switch
								size="small"
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								disabled={Answer && Answer !== '' ? false : true}
								loading={selectedId === Id ? switchLoading : false}
								checked={PublishStatus}
								onChange={() => {
									setSelectedId(Id);
									handleChangeStatus(Id, PublishStatus);
								}}
							/>
						</Tooltip>,
						<span
							key="comment-basic-reply-to"
							className="delete-qna"
							onClick={() => handleDelete(Id)}
						>
							Hapus <DeleteOutlined />
						</span>,
					]
				}
				author={<a>{Username}</a>}
				avatar={
					<Avatar
						src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
						alt="profile picture"
					/>
				}
				content={<p>{Question}</p>}
				datetime={formatDate(parseInt(createdAt))}
			>
				{Answer !== '' && showRelpies ? (
					<CommentComponent
						actions={[
							<span
								key="comment-basic-reply-to"
								onClick={() => {
									setTextValue(Answer);
									setSelectedId(Id);
									setShowReplies(!showRelpies);
									setShowEditor(!showEditor);
								}}
							>
								Ubah Jawaban
								<EditOutlined />
							</span>,
						]}
						author={<a>Admin</a>}
						avatar={
							<Avatar
								src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
								alt="profile picture"
							/>
						}
						content={<p>{Answer}</p>}
						datetime={formatDate(parseInt(updatedAt))}
					/>
				) : (
					showEditor && (
						<CommentEditor
							submitLoading={submitLoading}
							Id={Id}
							selectedId={selectedId}
							value={textValue}
							handleReply={handleReply}
							onChange={setTextValue}
							onSubmit={() => {
								handleReply(Id, textValue);
								setShowReplies(false);
								setShowEditor(false);
								setTextValue('');
							}}
							onCancel={() => {
								setShowReplies(false);
								setShowEditor(false);
								setSelectedId('');
								setTextValue('');
							}}
						/>
					)
				)}
			</CommentComponent>
		</>
	);
}

Comment.propTypes = {
	Id: PropTypes.string.isRequired,
	Username: PropTypes.string.isRequired,
	Question: PropTypes.string.isRequired,
	Answer: PropTypes.string,
	PublishStatus: PropTypes.bool.isRequired,
	submitLoading: PropTypes.bool.isRequired,
	switchLoading: PropTypes.bool.isRequired,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	handleChangeStatus: PropTypes.func,
	handleReply: PropTypes.func,
	handleDelete: PropTypes.func,
};

export default Comment;
