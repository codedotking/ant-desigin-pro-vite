import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Alert, App, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { getCaptcha, getCurrentUser, login } from '@/api/user';
import type { LoginParams, LoginResult } from '@/types/api';
import { useUserActions } from '@/stores';
import { Footer } from '@/components';

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        lang: {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        },
    };
});

const ActionIcons = () => {
    const { styles } = useStyles();
    return (
        <>
            <AlipayCircleOutlined
                key="AlipayCircleOutlined"
                className={styles.action}
            />
            <TaobaoCircleOutlined
                key="TaobaoCircleOutlined"
                className={styles.action}
            />
            <WeiboCircleOutlined
                key="WeiboCircleOutlined"
                className={styles.action}
            />
        </>
    );
};

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState<LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { setUser, setLoggedIn } = useUserActions();
    const { styles } = useStyles();
    const { message } = App.useApp();

    const fetchUserInfo = async () => {
        const { data } = await getCurrentUser();
        setUser(data);
    }

    const handleSubmit = async (values: LoginParams) => {
        try {
            // 登录
            const response = await login({ ...values, type }) as unknown as { data: LoginResult, status: string };
            if (response?.status === 'ok') {
                message.success('登录成功！');
                setLoggedIn()
                await fetchUserInfo();
                const urlParams = new URL(window.location.href).searchParams;
                window.location.href = urlParams.get('redirect') || '/';
                return;
            }
            // 如果失败去设置用户错误信息
            setUserLoginState({ status: 'error', type: 'account' });
        } catch (error) {
            console.log('登录错误:', error);
            message.error('登录失败，请重试！');
        }
    };
    const { status, type: loginType } = userLoginState;

    return (
        <div className={styles.container}>
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/vite.svg" />}
                    title="Ant Design Pro"
                    subTitle="欢迎使用 Ant Design Pro"
                    initialValues={{
                        autoLogin: true,
                        username: 'admin',
                        password: 'ant.design',
                    }}
                    actions={[
                        '其他登录方式',
                        <ActionIcons key="icons" />,
                    ]}
                    onFinish={async (values) => {
                        await handleSubmit(values as LoginParams);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        centered
                        items={[
                            {
                                key: 'account',
                                label: '账户密码登录',
                            },
                            {
                                key: 'mobile',
                                label: '手机号登录',
                            },
                        ]}
                    />

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage
                            content="账户或密码错误"
                        />
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined />,
                                }}
                                placeholder="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                placeholder="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'mobile' && (
                        <LoginMessage content="验证码错误" />
                    )}
                    {type === 'mobile' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined />,
                                }}
                                name="mobile"
                                placeholder="手机号"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder="请输入验证码"
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} 获取验证码`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async (phone) => {
                                    const result = await getCaptcha({
                                        phone
                                    }) as unknown as { success: boolean };
                                    console.log(result);
                                    if (!result.success) {
                                        return;
                                    }
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>

            <Footer />
        </div>
    );
};

export default Login;