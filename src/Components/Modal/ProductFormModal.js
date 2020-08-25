import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const layout = {
	layout: 'vertical',
};

export default function ProductFormModal({
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
					rules={[{ required: true, message: 'Isi Nama terlebih dahulu!' }]}
				>
					<Input placeholder="Nama produk" />
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
						placeholder="Deskripsi produk"
						autoSize={{ minRows: 3, maxRows: 6 }}
					/>
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Link Foto Produk"
					name="Thumbnail"
				>
					<Input placeholder="Link foto produk" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Kode Produk"
					name="ProductCode"
					rules={[
						{ required: true, message: 'Isi kode produk terlebih dahulu!' },
					]}
				>
					<Input placeholder="Kode produk" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Harga"
					name="Price"
					rules={[{ required: true, message: 'Isi Harga terlebih dahulu!' }]}
				>
					<Input type="number" placeholder="Harga produk" />
				</Form.Item>
			</Form>
		</Modal>
	);
}

ProductFormModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};
