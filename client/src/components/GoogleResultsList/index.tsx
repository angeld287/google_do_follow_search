import { List } from 'antd';
import React from 'react';
import GoogleResultItem from './GoogleResultItem';
import { IGoogleResultsList } from './IGoogleResultsList';

const GoogleResultsList: React.FC<IGoogleResultsList> = ({ data }) => (
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => <GoogleResultItem position={item.position} snippet={item.snippet} link={item.link} title={item.title} />}
    />
);

export default React.memo(GoogleResultsList);