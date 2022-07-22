import { Avatar, List } from 'antd';
import React from 'react';
import { ICustomList } from './ICustomList';
import styles from './styles'

const CustomList: React.FC<ICustomList> = ({ data }) => (
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                key={"item-position-" + item.position}
                actions={[<a key="list-loadmore-edit-">edit</a>, <a key="list-loadmore-more">more</a>]}
            >
                <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<><p>Title: </p><a href="https://ant.design">{item.title + " " + data.length}</a></>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )}
    />
);

export default CustomList;