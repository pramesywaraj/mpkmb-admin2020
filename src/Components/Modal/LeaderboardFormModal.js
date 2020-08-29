import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, DatePicker } from 'antd';

const layout = {
	layout: 'vertical',
};

export function CreateLeaderboardFormModal({
	isVisible,
	isEdit,
	addLoading,
	handleSubmit,
	handleCancel,
	formObject,
}) {
	return (
		<Modal
			title="Tambah Produk Baru"
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
					<Input placeholder="Judul Leaderboard" />
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
						placeholder="Deskripsi Leaderboard"
						autoSize={{ minRows: 3, maxRows: 6 }}
					/>
				</Form.Item>
				<Form.Item
					label="Tanggal Leaderboard"
					style={{
						marginBottom: '15px',
					}}
					name="Date"
					rules={[
						{
							type: 'object',
							required: true,
							message: 'Isi tanggal leaderboard terlebih dahulu!',
						},
					]}
				>
					<DatePicker />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export function CreateUserFormModal({
	isVisible,
	isEdit,
	addLoading,
	handleSubmit,
	handleCancel,
	formObject,
}) {
	return (
		<Modal
			title="Tambah Produk Baru"
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
					label="Nama"
					name="Name"
					rules={[{ required: true, message: 'Jangan biarkan Nama kosong!' }]}
				>
					<Input placeholder="Nama" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="NIM"
					name="NIM"
					rules={[{ required: true, message: 'Jangan biarkan NIM kosong!' }]}
				>
					<Input placeholder="NIM" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Poin"
					name="Point"
					rules={[{ required: true, message: 'Jangan biarkan Nama kosong!' }]}
				>
					<Input placeholder="Poin" type="number" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Rangking"
					name="Rank"
					rules={[
						{ required: true, message: 'Jangan biarkan Rangking kosong!' },
					]}
				>
					<Input placeholder="Rangking" type="number" />
				</Form.Item>
			</Form>
		</Modal>
	);
}

CreateLeaderboardFormModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};

CreateUserFormModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};
