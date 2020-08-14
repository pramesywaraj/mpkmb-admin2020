import React from 'react';
import { Typography, PageHeader, Alert } from 'antd';

import './Dashboard.scss';

const { Title } = Typography;

export default function Dashboard() {
	return (
		<>
			<PageHeader title="Dashboard" />
			<div className="dashboard-container">
				<Alert
					message="Selamat datang di panel admin MPKMB 2020"
					description="Saat ini panel admin MPKMB 2020 sedang dalam tahap pengembangan. Apabila pengguna menemukan kesalahan pada sistem, silahkan hubungi pengembang."
					type="warning"
					showIcon
				/>
			</div>
		</>
	);
}
