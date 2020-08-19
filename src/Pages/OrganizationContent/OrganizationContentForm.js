import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import {
	EditorState,
	convertFromHTML,
	ContentState,
	convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
	Row,
	PageHeader,
	Form,
	Input,
	Divider,
	Button,
	message as Message,
} from 'antd';
import {} from '@ant-design/icons';

import RichTextEditor from '../../Components/RichTextEditor/RichTextEditor';

import useLoading from 'Hooks/useLoading';

import {
	addOrganizationContent,
	editOrganizationContent,
} from 'Service/OrganizationContent';

export default function OrganizationContentForm() {
	const history = useHistory();
	let location = useLocation();
	const [type, setType] = useState('');
	const [editorValue, setEditorValue] = useState(EditorState.createEmpty());
	const [editContent, setEditContent] = useState({});
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();

	const [form] = Form.useForm();

	useEffect(() => {
		const type = location.pathname.substring(
			location.pathname.lastIndexOf('/') + 1
		);
		if (type === 'sunting') {
			setType('sunting');
			const editContent = JSON.parse(sessionStorage.getItem('editContent'));
			setEditContent(editContent);
			form.setFieldsValue(editContent);

			const blocksFromHTML = convertFromHTML(editContent.Article);
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			setEditorValue(EditorState.createWithContent(state));
		}
	}, []);

	function handleSubmit() {
		form.validateFields().then((values) => {
			if (type === 'sunting') {
				values.Article = draftToHtml(
					convertToRaw(editorValue.getCurrentContent())
				);

				let tempVal = {
					...editContent,
					...values,
				};

				return editExistingData(tempVal);
			}
			values.Article = draftToHtml(
				convertToRaw(editorValue.getCurrentContent())
			);
			return addNewData(values);
		});
	}

	async function editExistingData(values) {
		showSubmitLoading();
		try {
			await editOrganizationContent({ ...values });
			form.resetFields();
			Message.success('Data organisasi berhasil diubah');
			sessionStorage.removeItem('editContent');
			history.push('/admin/ukm-ormawa');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	async function addNewData(values) {
		showSubmitLoading();
		try {
			await addOrganizationContent({ ...values });
			form.resetFields();
			Message.success('Data organisasi berhasil ditambahkan');
			form.resetFields();
			sessionStorage.removeItem('editContent');
			history.push('/admin/ukm-ormawa');
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
	}

	function onCancel() {
		form.resetFields();
		sessionStorage.removeItem('editContent');
		history.push('/admin/ukm-ormawa');
	}

	return (
		<>
			<PageHeader title="Form UMK / Ormawa" />
			<div className="assignment-table-container">
				<Form form={form} layout="vertical">
					<Form.Item name="Title" label="Judul" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<div style={{ display: 'flex' }}>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
								marginRight: 'auto',
							}}
							name="Subtitle"
							label="Sub Judul"
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
							}}
							name="Thumbnail"
							label="Thumbnail"
						>
							<Input />
						</Form.Item>
					</div>
					<Form.Item
						name="Description"
						label="Deskripsi"
						// rules={[{ required: true }]}
					>
						<Input.TextArea />
					</Form.Item>

					<RichTextEditor
						textValue={editorValue}
						onTextChange={(value) => setEditorValue(value)}
					/>

					<Divider orientation="left">Link</Divider>
					<div style={{ display: 'flex' }}>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
								marginRight: 'auto',
							}}
							name="Url"
							label="External Link"
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
							}}
							name="FileUrl"
							label="File Link"
						>
							<Input />
						</Form.Item>
					</div>

					<Divider orientation="left">Sosial Media</Divider>
					<div style={{ display: 'flex' }}>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
								marginRight: 'auto',
							}}
							name="LineUrl"
							label="Line"
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
							}}
							name="TwitterUrl"
							label="Twitter"
						>
							<Input />
						</Form.Item>
					</div>

					<div style={{ display: 'flex' }}>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
								marginRight: 'auto',
							}}
							name="YoutubeUrl"
							label="Youtube"
						>
							<Input />
						</Form.Item>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
							}}
							name="InstagramUrl"
							label="Instagram"
						>
							<Input />
						</Form.Item>
					</div>
					<div style={{ display: 'flex' }}>
						<Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
								marginRight: 'auto',
							}}
							name="EmailUrl"
							label="Email"
						>
							<Input />
						</Form.Item>
						{/* <Form.Item
							style={{
								display: 'inline-block',
								width: 'calc(48% - 12px)',
							}}
							name="Instagram"
							label="Instagram"
						>
							<Input />
						</Form.Item> */}
					</div>
					<Divider />
					<Row justify="end">
						<Button className="mr-5" onClick={onCancel}>
							Cancel
						</Button>
						{type === 'sunting' ? (
							<Button
								type="primary"
								htmlType="submit"
								onClick={() => handleSubmit()}
								// icon={<UserAddOutlined />}
							>
								Simpan
							</Button>
						) : (
							<Button
								type="primary"
								htmlType="submit"
								loading={submitLoading}
								// icon={<UserAddOutlined />}
								onClick={() => handleSubmit()}
							>
								Tambahkan
							</Button>
						)}
					</Row>
				</Form>
			</div>
		</>
	);
}

OrganizationContentForm.propTypes = {
	match: PropTypes.object.isRequired,
};
