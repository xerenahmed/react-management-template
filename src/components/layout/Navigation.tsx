import React from 'react';
import {
    SettingsOutlined,
    LogoutOutlined,
    ListAltOutlined,
    Add,
    FormatListBulletedOutlined,
    AllInboxOutlined,
} from '@mui/icons-material/';

const Navigation = [
    {
        title: 'Products',
        icon: <AllInboxOutlined />,
        children: [
            { title: 'List', href: '/products', icon: <FormatListBulletedOutlined /> },
            { title: 'Add', href: '/products/add', icon: <Add /> },
        ],
    },
    { title: 'Orders', href: '/orders', icon: <ListAltOutlined /> },
    { title: 'Settings', href: '/settigns', icon: <SettingsOutlined /> },
    { title: 'Log out', href: '/logout', icon: <LogoutOutlined /> },
];
export default Navigation;
