import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select } from 'antd';

const layout = {
	layout: 'vertical',
};

const { Option } = Select;

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
					name="Title"
					rules={[{ required: true, message: 'Isi Judul terlebih dahulu!' }]}
				>
					<Input placeholder="Judul tugas/materi" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Tipe"
					name="Type"
					rules={[{ required: true, message: 'Isi Tipe terlebih dahulu!' }]}
				>
					<Select style={{ width: '100%' }}>
						<Option value="TUGAS">Penugasan</Option>
						<Option value="MATERI">Materi</Option>
					</Select>
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Deskripsi"
					name="Description"
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
					name="Thumbnail"
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
					name="Url"
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
					name="Category"
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
