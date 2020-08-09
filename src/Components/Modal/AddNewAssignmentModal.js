import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default function AddNewAssignmentModal({
	isVisible,
	addLoading,
	handleSubmit,
	handleCancel,
}) {
	return (
		<Modal
			title="Tambah Tugas/Materi Baru"
			visible={isVisible}
			onOk={handleSubmit}
			onCancel={handleCancel}
			confirmLoading={addLoading}
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Modal>
	);
}

AddNewAssignmentModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	addLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};
