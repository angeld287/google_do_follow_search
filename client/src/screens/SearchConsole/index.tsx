import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import CustomSearch from '../../components/CustomSearch';
import styles from './styles';

const SearchConsole: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const onSearch = (value: string) => {
        if (value === '')
            return null
        setLoading(true);
        console.log(value)
        console.log('value')
        setLoading(false);
    }
    return (
        <Content style={styles.container}>
            <h1>G🅾️🅾️🇬le Do Follow 👉 SEARCH 🔍 📙</h1>
            <CustomSearch placeholder='Type the long keyword' onSearch={onSearch} loading={loading} />
        </Content>
    );
};

export default SearchConsole;