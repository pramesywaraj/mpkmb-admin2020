import React from 'react';
import { useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';

import './Login.scss';

import useLoading from 'Hooks/useLoading';

import { Form, Input, Button, Typography, Card } from 'antd';

const { Title, Text, Link } = Typography;

const layout = {
	labelCol: { span: 5 },
};

const tailLayout = {
	wrapperCol: { offset: 5 },
};

export default function Login() {
	const [form] = Form.useForm();
	const history = useHistory();
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();

	function handleLogin() {
		showSubmitLoading();

		let userData = {
			...form.getFieldsValue(),
		};

		userData.password = sha256(userData.password);

		// setTimeout(() => {
		// 	hideSubmitLoading();
		// 	form.resetFields();

		// 	localStorage.setItem('MPKMB_ADMIN_USER', values);

		// 	history.push('/admin');
		// }, 1000);
	}

	return (
		<div className="container login-container">
			<Title>MPKMB 2020</Title>
			<Card title="Login untuk Masuk" bordered={false} className="login-card">
				<Form
					{...layout}
					form={form}
					name="basic"
					className="login-form"
					onFinish={handleLogin}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: 'Isi Email terlebih dahulu!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: 'Isi Password terlebih dahulu!' },
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout} className="login-button-submit">
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={submitLoading}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
			<Text mark className="with-love-text">
				Created with{' '}
				<span role="img" aria-label="love-emoji">
					❤️
				</span>{' '}
				by <Link href="https://codepanda.id/">Codepanda</Link>
			</Text>
		</div>
	);
}
