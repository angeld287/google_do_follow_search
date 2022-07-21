import { LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { logoutAsync } from '../../features/userSession/asyncThunks';
import { menuright } from './styles';

const session: MenuProps['items'] = [
    {
        label: 'Logout',
        key: 'lgout',
        icon: <LogoutOutlined />
    }
];


const Header: React.FC = () => {
    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(logoutAsync())
    }

    return (
        <>
            <Menu onClick={logOut} mode="horizontal" items={session} style={menuright} />
        </>
    );
};

export default React.memo(Header);