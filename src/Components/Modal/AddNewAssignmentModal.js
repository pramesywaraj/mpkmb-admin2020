import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const layout = {
	layout: 'vertical',
};

export default function AddNewAssignmentModal({
	isVisible,
	addLoading,
	handleSubmit,
	handleCancel,
	formObject,
}) {
	return (
		<Modal
			title="Tambah Tugas/Materi Baru"
			visible={isVisible}
			onOk={handleSubmit}
			onCancel={handleCancel}
			okText="Buat Baru"
			cancelText="Batal"
			confirmLoading={addLoading}
		>
			<Form
				{...layout}
				form={formObject}
				name="addNewAssignmentForm"
				initialValues={{ remember: true }}
				className="add-assignment"
			>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Judul"
					name="title"
					rules={[{ required: true, message: 'Isi Judul terlebih dahulu!' }]}
				>
					<Input placeholder="Judul tugas/materi" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Deskripsi"
					name="description"
					rules={[
						{ required: true, message: 'Isi Deskripsi terlebih dahulu!' },
					]}
				>
					<Input.TextArea
						placeholder="Deskripsi tugas/materi"
						autoSize={{ minRows: 3, maxRows: 6 }}
					/>
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Thumbnail Tugas/Materi"
					name="thumbnail"
					rules={[
						{
							required: true,
							message: 'Isi link gambar thumbnail terlebih dahulu!',
						},
					]}
				>
					<Input placeholder="Link untuk thumbnail" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Link Tugas/Materi"
					name="url"
					rules={[
						{
							required: true,
							message: 'Isi link untuk tugas/materi terlebih dahulu!',
						},
					]}
				>
					<Input placeholder="Link untuk tugas/materi" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Kategori"
					name="category"
					rules={[
						{
							required: true,
							message: 'Isi kategori terlebih dahulu!',
						},
					]}
				>
					<Input placeholder="Ketegori untuk judul pada tab" />
				</Form.Item>
			</Form>
		</Modal>
	);
}

AddNewAssignmentModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};
