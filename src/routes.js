import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from 'Utils/history';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import LayoutBase from 'Components/Layout/LayoutBase';

import Login from 'Pages/Login/Login';
import Dashboard from 'Pages/Dashboard/Dashboard';
import Assignment from 'Pages/Assignment/Assignment';
import User from 'Pages/User/User';
import Timeline from 'Pages/Timeline/Timeline';
import {
	OrganizationContent,
	OrganizationContentForm,
} from 'Pages/OrganizationContent';
import Store from 'Pages/Store/Store';
import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import QNA from 'Pages/QNA/QNA';

export const ROUTES = [
	{
		path: '/login',
		key: 'LOGIN',
		exact: true,
		layout: false,
		component: Login,
	},
	{
		path: '/admin',
		key: 'ADMIN_ROUTES',
		component: CheckAuth,
		routes: [
			{
				path: '/admin',
				key: 'DASHBOARD',
				exact: true,
				layout: true,
				component: Dashboard,
			},
			{
				path: '/admin/penugasan',
				key: 'ASSIGNMENT',
				exact: true,
				layout: true,
				component: Assignment,
			},
			{
				path: '/admin/pengguna',
				key: 'USER',
				exact: true,
				layout: true,
				component: User,
			},
			{
				path: '/admin/timeline',
				key: 'TIMELINE',
				exact: true,
				layout: true,
				component: Timeline,
			},
			{
				path: '/admin/ukm-ormawa',
				key: 'UKM-ORMAWA',
				exact: true,
				layout: true,
				component: OrganizationContent,
			},
			{
				path: '/admin/ukm-ormawa/tambah',
				key: 'ADD_UKM_ORMAWA',
				exact: true,
				layout: true,
				component: OrganizationContentForm,
			},
			{
				path: '/admin/ukm-ormawa/:id/sunting',
				key: 'SUNTING_UKM_ORMAWA',
				exact: true,
				layout: true,
				component: OrganizationContentForm,
			},
			{
				path: '/admin/mpkmb-store',
				key: 'MPKMB_STORE_DASHBOARD',
				exact: true,
				layout: true,
				component: Store,
			},
			{
				path: '/admin/leaderboard',
				key: 'MPKMB_STORE_LEADERBOARD',
				exact: true,
				layout: true,
				component: Leaderboard,
      },
      {
				path: '/admin/qna',
				key: 'MPKMB_QNA',
				exact: true,
				layout: true,
				component: QNA,
			},
		],
	},
];

function CheckAuth(props) {
	if (!Cookies.get('MPKMB_ADMIN_TOKEN')) {
		alert('Anda harus login terlebih dahulu!');
		return <Redirect to={'/'} />;
	}
	return <RenderRoutes {...props} />;
}

function ModifiedRoute(route) {
	const { layout } = route;

	if (!layout)
		return (
			<Route
				path={route.path}
				exact={route.exact}
				render={(props) => <route.component {...props} routes={route.routes} />}
			/>
		);

	return (
		<LayoutBase>
			<Route
				path={route.path}
				exact={route.exact}
				render={(props) => <route.component {...props} routes={route.routes} />}
			/>
		</LayoutBase>
	);
}

export default function RenderRoutes({ routes }) {
	return (
		<Router history={history}>
			<Switch>
				{routes.map((route) => {
					return <ModifiedRoute key={route.key} {...route} />;
				})}
				<Route exact path="/" component={() => <Redirect to="/login" />} />
				<Route>
					<h1>Not Found!</h1>
				</Route>
			</Switch>
		</Router>
	);
}

RenderRoutes.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			route: PropTypes.object,
		})
	),
};
