import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import LayoutBase from 'Components/Layout/LayoutBase';

import Login from 'Pages/Login/Login';
import Dashboard from 'Pages/Dashboard/Dashboard';

export const ROUTES = [
	{
		path: '/',
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
		],
	},
];

function CheckAuth(props) {
	if (!localStorage.getItem('MPKMB_ADMIN_USER')) {
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
		<>
			<LayoutBase>
				<Route
					path={route.path}
					exact={route.exact}
					render={(props) => (
						<route.component {...props} routes={route.routes} />
					)}
				/>
			</LayoutBase>
		</>
	);
}

export default function RenderRoutes({ routes }) {
	return (
		<Router>
			<Switch>
				{routes.map((route) => {
					return <ModifiedRoute key={route.key} {...route} />;
				})}
				<Route component={() => <h1>Not Found!</h1>} />
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
