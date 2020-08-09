import React from 'react';
import {
	Typography,
	PageHeader,
	Table,
	Tag,
	Space,
	Button,
	Switch,
} from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { PENUGASAN, MATERI } from 'Constants/assignmentConst';

import './Assignment.scss';

const { Title } = Typography;
const { Column } = Table;

const dummyAssignmentData = [
	{
		id: '1',
		title: 'Tugas Pertama',
		description: 'Tugas ini akan dikumpulkan via email',
		thumbnail: '',
		url: 'www.google.com',
		publish_status: true,
		category: 'Tugas Pertama',
		order: '',
		type: 'PENUGASAN',
		createdAt: '2020-08-10 00:00:00.000000',
		updatedAt: '2020-08-10 00:00:00.000000',
	},
	{
		id: '1',
		title: 'Tugas Kedua',
		description: 'Tugas ini akan dikumpulkan via email',
		thumbnail: '',
		url: 'www.google.com',
		publish_status: true,
		category: 'Tugas Kedua',
		order: '',
		type: 'MATERI',
		createdAt: '2020-08-10 00:00:00.000000',
		updatedAt: '2020-08-10 00:00:00.000000',
	},
];

export default function Assignment() {
	return (
		<>
			<PageHeader title="Penugasan" />
			<div className="assignment-table-container">
				<Table
					dataSource={dummyAssignmentData}
					pagination={{ position: ['bottomCenter'] }}
				>
					<Column title="Judul Tugas" dataIndex="title" key="title" />
					<Column title="Kategori" dataIndex="category" key="category" />
					<Column
						title="Tipe"
						dataIndex="type"
						key="type"
						render={(type) => {
							if (type === PENUGASAN) return <Tag color="blue">Penugasan</Tag>;
							if (type === MATERI) return <Tag color="red">Materi</Tag>;
						}}
					/>
					<Column
						title="Tampilkan"
						dataIndex="publish_status"
						key="publish_status"
						render={(status) => <Switch loading checked={status} />}
					/>
					<Column
						title="Aksi"
						key="action"
						render={() => (
							<Space size="middle">
								<Button type="primary" icon={<EditFilled />}>
									Sunting
								</Button>
								<Button danger type="primary" icon={<DeleteFilled />}>
									Hapus
								</Button>
							</Space>
						)}
					/>
				</Table>
			</div>
		</>
	);
}