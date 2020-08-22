import React from 'react';
import { PageHeader, Card, Avatar, Row, Col, Button } from 'antd';
import {
	EditOutlined,
	DeleteFilled,
	PlusCircleFilled,
} from '@ant-design/icons';

const { Meta } = Card;

export default function Store() {
	return (
		<>
			<PageHeader title="MPKMB Store" />
			<div style={{ padding: '32px' }}>
				<Row style={{ paddingBottom: 15 }} align="middle" justify="end">
					<Button type="primary" icon={<PlusCircleFilled />}>
						Tambah Produk Baru
					</Button>
				</Row>
				<Row gutter={{ xs: 8, sm: 8, md: 24, lg: 32 }}>
					<Col className="gutter-row" span={6}>
						<Card
							style={{ width: 'auto' }}
							cover={
								<img
									alt="example"
									src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
								/>
							}
							actions={[
								<EditOutlined key="edit" />,
								<DeleteFilled key="delete" />,
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
					</Col>
				</Row>
			</div>
		</>
	);
}
