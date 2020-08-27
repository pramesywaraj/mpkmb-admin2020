import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentComponent, Avatar, Switch } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useLoading from 'Hooks/useLoading';
import formatDate from '../../Utils/date'
import CommentEditor from './CommentEditor';

function Comment({
	Id,
	Username,
	Question,
	Answer,
	PublishStatus,
	createdAt,
	updatedAt,
	handleChangeStatus,
	handleReply,
	handleDelete,
}) {
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();
	const [switchLoading, showSwitchLoading, hideSwitchLoading] = useLoading();
	const [showRelpies, setShowReplies] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
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
								onClick={() => setShowEditor(!showEditor)}
							>
								Balas
							</span>
						),
						<Switch
							// loading={false}
							checked={PublishStatus}
							onChange={() => handleChangeStatus(Id, PublishStatus)}
						/>,
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
							value={textValue}
							handleReply={handleReply}
							onChange={setTextValue}
							onSubmit={() => {
								handleReply(Id, textValue);
								setTextValue('');
								setShowReplies(false);
								setShowEditor(false);
							}}
							onCancel={() => {
								setTextValue('');
								setShowReplies(false);
								setShowEditor(false);
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
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	handleChangeStatus: PropTypes.func,
	handleReply: PropTypes.func,
	handleDelete: PropTypes.func,
};

export default Comment;
