import { LoadingOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, List, Row, Tag } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getPageSourceAsync } from '../../../features/pageSource/asyncThunks';
import { IPageSourceSlice } from '../../../features/pageSource/IPageSource';
import { selectPageSource } from '../../../features/pageSource/pageSourceSlice';
import { IGoogleSearchResult } from '../../../interfaces/models/IGoogleSearchResult';
import CustomButton from '../../CustomButton';

const GoogleResultsList: React.FC<IGoogleSearchResult> = ({ position, snippet, link, title }) => {
    const pageSource: IPageSourceSlice = useAppSelector(selectPageSource);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPageSourceAsync({ url: link }))
    }, [link, dispatch])

    const goToLink = useCallback((link: string) => {
        window.location.href = link;
    }, [])

    const FollowTag = useCallback(() => (pageSource.status === 'pending') ? <LoadingOutlined /> : (
        (pageSource.status === 'failed' ? <Tag color="#f50">Error</Tag> :
            (pageSource.results?.hasDoFollow ? <Tag color="#87d068">Has do Follow - Count: {pageSource.results.doFollowCount}</Tag> :
                (<Tag color="#f50">No Has Do Follow</Tag>)
            )
        )
    ), [pageSource.status, pageSource.results])

    return (
        <List.Item
            key={"item-position-" + position}
            actions={[
                <CustomButton onClick={e => { e.preventDefault(); goToLink(link) }} color='blue' _key="item-more-btn" icon={<MoreOutlined />}></CustomButton>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<Row><p>Title: </p><a target="_blank" rel="noreferrer" href={link}>{title}</a></Row>}
                description={<> <FollowTag /> {snippet}</>}
            />
        </List.Item>
    )
};

export default React.memo(GoogleResultsList);