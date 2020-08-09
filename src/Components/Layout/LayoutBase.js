import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
		id: '1',
		route: '/',
		name: 'Dashboard',
		icon: <HomeFilled />,
	},
	{
		id: '2',
		route: '/penugasan',
		name: 'Penugasan',
		icon: <ReadFilled />,
	},
];

export default function LayoutBase({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const history = useHistory();

	function onCollapsed(collapsed) {
		setCollapsed(collapsed);
	}

	function onGoTo(route) {
		history.push(`/admin${route}`);
	}

	function onLogout() {
		localStorage.removeItem('MPKMB_ADMIN_USER');

		setTimeout(() => {
			alert('Anda telah keluar dari aplikasi ini.');
			history.push('/');
		});
	}

	return (
		<Layout className="layout-container">
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
				<div className="layout-logo">
					<img src={MainLogo} alt="Logo MPKMB 2020" />
				</div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					{menuItems.map(({ id, icon, name, route }) => (
						<Menu.Item key={id} icon={icon} onClick={() => onGoTo(route)}>
							{name}
						</Menu.Item>
					))}
					<Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
						Keluar
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Content className="layout-content-container">{children}</Content>
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
