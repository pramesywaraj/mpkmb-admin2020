import React from 'react';
import './Login.scss';

import useLoading from 'Hooks/useLoading';
import useInput from 'Hooks/useInput';

import { Form, Input, Button, Typography, Card } from 'antd';

const { Title, Text, Link } = Typography;

const layout = {
	labelCol: { span: 5 },
};

const tailLayout = {
	wrapperCol: { offset: 5 },
};

export default function Login() {
	const [loginObj, changeLoginObjectValue, resetLoginObjectValue] = useInput({
		username: '',
		password: '',
	});
	const [submitLoading, showSubmitLoading, hideSubmitLoading] = useLoading();

	function handleLogin() {
		showSubmitLoading();

		setTimeout(() => {
			hideSubmitLoading();
			resetLoginObjectValue();
		}, 1000);
	}

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
						rules={[
							{ required: true, message: 'Isi Username terlebih dahulu!' },
						]}
					>
						<Input
							value={loginObj.username}
							onChange={changeLoginObjectValue}
						/>
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: 'Isi Password terlebih dahulu!' },
						]}
					>
						<Input.Password
							value={loginObj.password}
							onChange={changeLoginObjectValue}
						/>
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
				Created with ❤️ by <Link href="https://codepanda.id/">Codepanda</Link>
			</Text>
		</div>
	);
}
