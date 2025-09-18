import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
// import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
// import { outLogin } from '@/services/ant-design-pro/api';
import HeaderDropdown from '../HeaderDropdown';
import { useUser, useUserActions } from '@/stores';
import { useNavigate } from 'react-router-dom';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    const initialState = useUser();
    const currentUser = initialState || {};
    return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            display: 'flex',
            height: '48px',
            marginLeft: 'auto',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0 8px',
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
    };
});




export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
    menu,
    children,
}) => {

    const navigate = useNavigate();

    /**
    * 退出登录，并且将当前的 url 保存
    */
    const loginOut = async () => {
        // await outLogin();
        const { search, pathname } = window.location;
        const urlParams = new URL(window.location.href).searchParams;
        const searchParams = new URLSearchParams({
            redirect: pathname + search,
        });
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/user/login' && !redirect) {
            console.log('跳转登录', pathname, searchParams.toString());
            navigate({
                pathname: '/user/login',
                search: searchParams.toString(),
            });
        }
    };

    const { styles } = useStyles();

    const initialState = useUser();
    const { setUser } = useUserActions();
    // const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick: MenuProps['onClick'] = (event) => {
        const { key } = event;
        if (key === 'logout') {
            console.log(setUser);
            // flushSync(() => {
            //     // 清空用户信息
            //     setUser({ ...initialState, name: '' });
            // });
            loginOut();
            return;
        }
        // 跳转个人中心
        // navigate(`/account/${key}`);
    };

    console.log("avatar", initialState);

    const loading = (
        <span className={styles.action}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const currentUser = initialState;

    if (!currentUser || !currentUser.name) {
        return loading;
    }

    const menuItems = [
        ...(menu
            ? [
                {
                    key: 'center',
                    icon: <UserOutlined />,
                    label: '个人中心',
                },
                {
                    key: 'settings',
                    icon: <SettingOutlined />,
                    label: '个人设置',
                },
                {
                    type: 'divider' as const,
                },
            ]
            : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            {children}
        </HeaderDropdown>
    );
};
