import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const CommentEditor = ({ onCancel, value, onChange, onSubmit }) => (
	<>
		<Form.Item>
			<TextArea
				rows={4}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" type="primary" onClick={onSubmit}>
				Reply
			</Button>
			<Button htmlType="submit" type="danger" onClick={onCancel}>
				Cancel
			</Button>
		</Form.Item>
	</>
);

CommentEditor.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	value: PropTypes.string,
};

export default CommentEditor;
