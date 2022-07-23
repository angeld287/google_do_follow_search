import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import React, { useEffect } from 'react';
import CustomButton from '../CustomButton';
import { ICustomList } from './ICustomList';

const CustomList: React.FC<ICustomList> = ({ data }) => {

    useEffect(() => {

    }, [])

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={"item-position-" + item.position}
                    actions={[
                        <CustomButton color='blue' _key="item-edit-btn" icon={<EditOutlined />}></CustomButton>,
                        <CustomButton color='blue' _key="item-more-btn" icon={<MoreOutlined />}></CustomButton>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<><p>Title: </p><a href={item.link}>{item.title}</a></>}
                        description={item.htmlSnippet}
                    />
                </List.Item>
            )}
        />
    )
};

export default React.memo(CustomList);