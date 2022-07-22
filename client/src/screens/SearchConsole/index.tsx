import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomButton from '../../components/CustomButton';
import CustomList from '../../components/CustomList';
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

    const onSearch = useCallback((text: string) => {
        setError(false)
        setIndex(0)
        if (text === '') {
            setError(true)
            return null
        }

        setValue(text)
        dispatch(searchAsync({ text, index: 0 }))
    }, [dispatch]);

    const getPreviousItems = useCallback(() => {
        let _index = index - 10;
        setIndex(_index)
        dispatch(searchAsync({ text: value, index: _index }))
    }, [dispatch, value, index])

    const getNextItems = useCallback(() => {
        let _index = index + 10;
        setIndex(_index)
        dispatch(searchAsync({ text: value, index: _index }))
    }, [dispatch, value, index])

    return (
        <Content style={styles.container}>
            <h1>G🅾️🅾️🇬le 🔙Links 🔗 👉 SEARCH 🔍 📙</h1>
            <CustomSearch placeholder='Type the long keyword' onSearch={onSearch} loading={session.status === 'pending'} />
            {
                error &&
                (
                    <div style={{ textAlign: 'right' }}>
                        <Alert message="Please type some keyword." type="error" />
                    </div>
                )
            }
            {(session.results.length !== 0) &&
                <>
                    <CustomList data={session.results} />
                    <div style={styles.buttons}>
                        <CustomButton onClick={getPreviousItems} icon={<DoubleLeftOutlined />} customStyle={styles.button} htmlType="button" _key="btn-previous" disabled={(session.results.length === 0 || index === 0)} color="blue">Previous</CustomButton>
                        <CustomButton onClick={getNextItems} customStyle={styles.button} htmlType="button" _key="btn-next" disabled={session.results.length === 0} color="blue">Next <DoubleRightOutlined /></CustomButton>
                    </div>
                </>
            }

        </Content>
    );
};

export default React.memo(SearchConsole);