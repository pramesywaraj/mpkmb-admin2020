import React from 'react';
import './Login.scss';

import { Form, Input, Button, Typography, Card } from 'antd';

const { Title, Text, Link } = Typography;

const layout = {
	labelCol: { span: 5 },
};

const tailLayout = {
	wrapperCol: { offset: 5 },
};

export default function Login() {
	return (
		<div className="container login-container">
			<Title>MPKMB 2020</Title>
			<Card title="Login untuk Masuk" bordered={false} className="login-card">
				<Form
					name="basic"
					initialValues={{ remember: true }}
					className="login-form"
					{...layout}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout} className="login-button-submit">
						<Button type="primary" htmlType="submit" block loading>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
			<Text mark className="with-love-text">
				Created with ❤️ by <Link href="https://codepanda.id/">Codepanda</Link>
			</Text>
		</div>
	);
}
