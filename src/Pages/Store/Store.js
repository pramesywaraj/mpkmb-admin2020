import React from 'react';
import { PageHeader, Card, Avatar } from 'antd';
import {
	SettingOutlined,
	EditOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

export default function Store() {
	return (
		<>
			<PageHeader title="MPKMB Store" />
			<div style={{ padding: '32px' }}>
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt="example"
							src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
						/>
					}
					actions={[
						<SettingOutlined key="setting" />,
						<EditOutlined key="edit" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Meta
						avatar={
							<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						}
						title="Card title"
						description="This is the description"
					/>
				</Card>
			</div>
		</>
	);
}
