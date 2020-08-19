import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor({ textValue, onTextChange }) {
	function onEditorStateChange(editorState) {
		onTextChange(editorState);
	}

	return (
		<div>
			<Editor
				editorState={textValue}
				onEditorStateChange={onEditorStateChange}
				// wrapperClassName="wrapper-class"
				// editorClassName="editor-class"
				// toolbarClassName="toolbar-class"
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				wrapperStyle={{
					minHeight: 500,
				}}
				editorStyle={{
					minHeight: 376,
					border: '1px solid #F1F1F1',
					padding: 5,
					borderRadius: 2,
					height: 'auto',
				}}
				toolbar={{
					inline: {
						inDropdown: false,
					},
					list: { inDropdown: true },
					textAlign: { inDropdown: true },
					link: { inDropdown: true },
					history: { inDropdown: true },
					emoji: { inDropdown: false },
				}}
			/>
		</div>
	);
}

RichTextEditor.propTypes = {
	textValue: PropTypes.string.isRequired,
	onTextChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
