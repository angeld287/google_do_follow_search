import { Alert } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import CustomSearch from '../../components/CustomSearch';
import styles from './styles';

const SearchConsole: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSearch = (value: string) => {
        setError(false)
        if (value === '') {
            setError(true)
            return null
        }

        setLoading(true);
        console.log(value)
        console.log('value')
        setLoading(false);
    }

    return (
        <Content style={styles.container}>
            <h1>G🅾️🅾️🇬le Do Follow 👉 SEARCH 🔍 📙</h1>
            <CustomSearch placeholder='Type the long keyword' onSearch={onSearch} loading={loading} />
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