import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, DatePicker } from 'antd';

const layout = {
	layout: 'vertical',
};

export default function AddNewTimelineModal({
	isVisible,
	isEdit,
	addLoading,
	handleSubmit,
	handleCancel,
	formObject,
}) {
	return (
		<Modal
			title="Tambah Timeline Baru"
			visible={isVisible}
			onOk={handleSubmit}
			onCancel={handleCancel}
			okText={isEdit ? 'Simpan' : 'Buat Baru'}
			cancelText="Batal"
			confirmLoading={addLoading}
			forceRender
		>
			<Form
				{...layout}
				form={formObject}
				name="addNewTimelineModal"
				initialValues={{ remember: true }}
				className="add-new-timeline"
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
					label="Tanggal Penting"
					style={{
						marginBottom: '15px',
					}}
					name="Date"
					rules={[
						{
							type: 'object',
							required: true,
							message: 'Isi tanggal penting terlebih dahulu!',
						},
					]}
				>
					<DatePicker />
				</Form.Item>
			</Form>
		</Modal>
	);
}

AddNewTimelineModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};
