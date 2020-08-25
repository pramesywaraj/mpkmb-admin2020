import React from 'react';
import PropTypes from 'prop-types';
import { Card, Switch, Divider } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

import './StoreCard.scss';

const { Meta } = Card;

export default function StoreCard({
	loading,
	data,
	handleDelete,
	handleSwitch,
}) {
	const {
		Id,
		Name,
		Description,
		Thumbnail,
		ProductCode,
		Price,
		PublishStatus,
	} = data;

	return (
		<Card
			style={{ width: 'auto', marginTop: 20 }}
			cover={<img alt={Name} src={Thumbnail} />}
			actions={[
				<EditOutlined key="edit" />,
				<DeleteFilled
					key="delete"
					style={{ color: 'red' }}
					onClick={() => handleDelete(Id)}
				/>,
				<Switch
					key="switch"
					checked={PublishStatus}
					onChange={() => handleSwitch(Id)}
				/>,
			]}
			loading={loading}
		>
			<Meta title={Name} description={Description} />
			<Divider plain orientation="left">
				Kode
			</Divider>
			<Meta description={ProductCode} />
			<Divider plain orientation="left">
				Harga
			</Divider>
			<Meta description={`Rp. ${Price}`} />
		</Card>
	);
}

StoreCard.propTypes = {
	loading: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
};
