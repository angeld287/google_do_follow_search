import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, List, Row } from 'antd';
import React from 'react';
import { IGoogleSearchResult } from '../../../interfaces/models/IGoogleSearchResult';
import CustomButton from '../../CustomButton';

const GoogleResultsList: React.FC<IGoogleSearchResult> = ({ position, htmlSnippet, link, title }) => (
    <List.Item
        key={"item-position-" + position}
        actions={[
            <CustomButton color='blue' _key="item-edit-btn" icon={<EditOutlined />}></CustomButton>,
            <CustomButton color='blue' _key="item-more-btn" icon={<MoreOutlined />}></CustomButton>
        ]}
    >
        <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<Row><p>Title: </p><a href={link}>{title}</a></Row>}
            description={htmlSnippet}
        />
    </List.Item>
);

export default React.memo(GoogleResultsList);