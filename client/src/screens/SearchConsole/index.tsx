import { Alert } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomCompleteItemList from '../../components/CustomCompleteItemList';
import CustomSearch from '../../components/CustomSearch';
import { searchAsync } from '../../features/googleSearch/asyncThunks';
import { selectSearch } from '../../features/googleSearch/searchSlice';
import styles from './styles';

const SearchConsole: React.FC = () => {

    const session = useAppSelector(selectSearch);
    const dispatch = useAppDispatch()
    const [error, setError] = useState(false);
    const [index, setIndex] = useState(0);
    const [value, setValue] = useState("");

    useEffect(() => {
        console.log(session.results)
    }, [session.results])

    useEffect(() => {
        dispatch(searchAsync({ text: value, index: index }))
    }, [index])

    const onSearch = useCallback((text: string) => {
        setError(false)
        if (text === '') {
            setError(true)
            return null
        }

        setValue(text)
        dispatch(searchAsync({ text, index: 0 }))
    }, [dispatch]);

    return (
        <Content style={styles.container}>
            <h1>G🅾️🅾️🇬le Do Follow 👉 SEARCH 🔍 📙</h1>
            <CustomSearch placeholder='Type the long keyword' onSearch={onSearch} loading={session.status === 'pending'} />
            {
                error &&
                (
                    <div style={{ textAlign: 'right' }}>
                        <Alert message="Please type some keyword." type="error" />
                    </div>
                )
            }

            <CustomCompleteItemList />
        </Content>
    );
};

export default React.memo(SearchConsole);