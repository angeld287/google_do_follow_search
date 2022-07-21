import { Alert } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomSearch from '../../components/CustomSearch';
import { searchAsync } from '../../features/googleSearch/asyncThunks';
import { selectSearch } from '../../features/googleSearch/searchSlice';
import styles from './styles';

const SearchConsole: React.FC = () => {

    const session = useAppSelector(selectSearch);
    const dispatch = useAppDispatch()
    const [error, setError] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        console.log(session.results)

    }, [session.results])

    const onSearch = (text: string) => {
        setError(false)
        if (text === '') {
            setError(true)
            return null
        }
        dispatch(searchAsync({ text, index }))
        console.log(session.results)
    }

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
        </Content>
    );
};

export default SearchConsole;