import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const layout = {
	layout: 'vertical',
};

export default function UserModal({
	isVisible,
	isEdit,
	addLoading,
	handleSubmit,
	handleCancel,
	formObject,
}) {
	return (
		<Modal
			title={isEdit ? 'Sunting Pengguna' : 'Tambahkan Pengguna'}
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
				name="addNewAssignmentForm"
				initialValues={{ remember: true }}
				className="add-assignment"
			>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Nama"
					name="Name"
					rules={[{ required: true, message: 'Isi nama terlebih dahulu !' }]}
				>
					<Input placeholder="Nama pengguna" />
				</Form.Item>
				<Form.Item
					style={{
						marginBottom: '15px',
					}}
					label="Email"
					name="Email"
					rules={[{ required: true, message: 'Isi Email terlebih dahulu!' }]}
				>
					<Input placeholder="Email pengguna" />
				</Form.Item>
				{!isEdit && (
					<>
						<Form.Item
							name="Password"
							label="Password"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="Konfirmasi Password"
							dependencies={['Password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('Password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											'The two passwords that you entered do not match!'
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
					</>
				)}
			</Form>
		</Modal>
	);
}
UserModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	formObject: PropTypes.object,
};
