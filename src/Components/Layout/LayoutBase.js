import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import { Layout, Menu, Typography } from 'antd';

import {
	HomeFilled,
	ReadFilled,
	LogoutOutlined,
	UserOutlined,
	CalendarFilled,
	GlobalOutlined,
	ShopFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import './LayoutBase.scss';
import MainLogo from 'Assets/logo.svg';

const { Content, Footer, Sider } = Layout;
const { Text, Link } = Typography;

const menuItems = [
	{
		route: '/admin',
		name: 'Dashboard',
		icon: <HomeFilled />,
	},
	{
		route: '/admin/penugasan',
		name: 'Penugasan',
		icon: <ReadFilled />,
	},
	{
		route: '/admin/pengguna',
		name: 'Pengguna',
		icon: <UserOutlined />,
	},
	{
		route: '/admin/timeline',
		name: 'Timeline',
		icon: <CalendarFilled />,
	},
	{
		route: '/admin/ukm-ormawa',
		name: 'UKM & Ormawa',
		icon: <GlobalOutlined />,
	},
	{
		route: '/admin/mpkmb-store',
		name: 'MPKMB Store',
		icon: <ShopFilled />,
	},
	{
		route: '/admin/qna',
		name: 'QNA',
		icon: <QuestionCircleFilled />,
	},
];

export default function LayoutBase({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const [selected, setSelected] = useState('1');
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		setSelected(location.pathname);
	});

	function onCollapsed(collapsed) {
		setCollapsed(collapsed);
	}

	function onGoTo(key, route) {
		history.push(route);
	}

	function onLogout() {
		Cookies.remove('MPKMB_ADMIN_TOKEN');

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
				<Menu theme="dark" selectedKeys={[selected]} mode="inline">
					{menuItems.map(({ icon, name, route }) => (
						<Menu.Item
							key={route}
							icon={icon}
							onClick={({ key }) => onGoTo(key, route)}
						>
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
