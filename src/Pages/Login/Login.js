import React from 'react';
import { useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import Cookies from 'js-cookie';

import './Login.scss';

import useLoading from 'Hooks/useLoading';
import { onLogin } from 'Service/Login';

import {
	Form,
	Input,
	Button,
	Typography,
	Card,
	message as Message,
} from 'antd';

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

	async function handleLogin() {
		showSubmitLoading();

		let userData = {
			...form.getFieldsValue(),
		};

		const { email, password } = userData;

		let hashedPass = sha256(password);

		try {
			// Destructure nested object
			const {
				Login: { Token },
			} = await onLogin({ Email: email, Password: hashedPass });

			Cookies.set('MPKMB_ADMIN_TOKEN', Token);

			Message.success('Anda berhasil masuk');

			setTimeout(() => {
				history.push('/admin');
			}, 1000);
		} catch (e) {
			const { message } = e;
			Message.error(message);
		} finally {
			hideSubmitLoading();
		}
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
