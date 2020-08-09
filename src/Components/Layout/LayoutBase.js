import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Layout, Menu, Typography } from 'antd';

import { HomeFilled, ReadFilled, LogoutOutlined } from '@ant-design/icons';

import './LayoutBase.scss';
import MainLogo from 'Assets/logo.svg';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Text, Link } = Typography;

const menuItems = [
	{
		id: '/',
		name: 'Dashboard',
		icon: <HomeFilled />,
	},
	{
		id: '/penugasan',
		name: 'Penugasan',
		icon: <ReadFilled />,
	},
];

export default function LayoutBase({ children }) {
	const [collapsed, setCollapsed] = useState(false);

	function onCollapsed(collapsed) {
		setCollapsed(collapsed);
	}

	return (
		<Layout className="layout-container">
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
				<div className="layout-logo">
					<img src={MainLogo} alt="Logo MPKMB 2020" />
				</div>
				<Menu theme="dark" defaultSelectedKeys={['/']} mode="inline">
					{menuItems.map((item) => (
						<Menu.Item key={item.id} icon={item.icon}>
							{item.name}
						</Menu.Item>
					))}
					<Menu.Item key="logout" icon={<LogoutOutlined />}>
						Keluar
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Content className="layout-content-container">
					<div
						className="site-layout-background"
						style={{ padding: 24, minHeight: 360 }}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					<Text mark className="with-love-text">
						Created with{' '}
						<span role="img" aria-label="love-emoji">
							❤️
						</span>{' '}
						by <Link href="https://codepanda.id/">Codepanda</Link>
					</Text>
				</Footer>
			</Layout>
		</Layout>
	);
}

LayoutBase.propTypes = {
	children: PropTypes.node.isRequired,
};
