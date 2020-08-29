import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const CommentEditor = ({
	onCancel,
	value,
	onChange,
	onSubmit,
	submitLoading,
	Id,
	selectedId,
}) => (
	<>
		<Form.Item>
			<TextArea
				rows={4}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</Form.Item>
		<Form.Item>
			<Button
				className="mr-5"
				loading={Id === selectedId ? submitLoading : false}
				htmlType="submit"
				type="primary"
				onClick={onSubmit}
			>
				Balas
			</Button>
			<Button htmlType="submit" type="danger" onClick={onCancel}>
				Batal
			</Button>
		</Form.Item>
	</>
);

CommentEditor.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	submitLoading: PropTypes.bool.isRequired,
	Id: PropTypes.string,
	selectedId: PropTypes.string,
	value: PropTypes.string,
};

export default CommentEditor;
