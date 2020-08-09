import React from 'react';
import { useHistory } from 'react-router-dom';
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

	function handleLogin(values) {
		showSubmitLoading();

		setTimeout(() => {
			hideSubmitLoading();
			form.resetFields();

			localStorage.setItem('MPKMB_ADMIN_USER', values);

			history.push('/admin');
		}, 1000);
	}

	return (
		<div className="container login-container">
			<Title>MPKMB 2020</Title>
			<Card title="Login untuk Masuk" bordered={false} className="login-card">
				<Form
					{...layout}
					form={form}
					name="basic"
					initialValues={{ remember: true }}
					className="login-form"
					onFinish={handleLogin}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{ required: true, message: 'Isi Username terlebih dahulu!' },
						]}
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
							onClick={handleLogin}
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
