import { login } from "@/api/user"
import { useState } from "react"
import { Form, Input, Button, message, Tabs, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const { TabPane } = Tabs;

export default function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [autoLogin, setAutoLogin] = useState(true);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await login({
                username: values.username,
                password: values.password
            });

            if (response.code === 200) {
                message.success('登录成功！');
                navigate('/');
            } else {
                message.error(response.data.message || '登录失败');
            }
        } catch {
            message.error('登录失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = () => {
        message.error('请填写完整信息');
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Tabs defaultActiveKey="account" centered>
                    <TabPane tab="账户密码登录" key="account">
                        <Form
                            form={form}
                            name="login"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            size="middle"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名!' }]}
                            >
                                <Input
                                    size="middle"
                                    prefix={<UserOutlined />}
                                    placeholder="用户名: admin or user"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password
                                    size="middle"
                                    prefix={<LockOutlined />}
                                    placeholder="密码: ant.design"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <div className={styles.options}>
                                <Checkbox
                                    checked={autoLogin}
                                    onChange={(e) => setAutoLogin(e.target.checked)}
                                >
                                    自动登录
                                </Checkbox>
                                <a href="#" className={styles.forgotPassword}>忘记密码?</a>
                            </div>

                            <Form.Item>
                                <Button
                                    size="middle"
                                    type="primary"
                                    htmlType="submit"
                                    className={styles.button}
                                    loading={loading}
                                    block
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane tab="手机号登录" key="phone">
                        <Form
                            name="phoneLogin"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            size="middle"
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: '请输入手机号!' },
                                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号!' }
                                ]}
                            >
                                <Input
                                    size="middle"
                                    prefix={<UserOutlined />}
                                    placeholder="请输入手机号"
                                />
                            </Form.Item>

                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: '请输入验证码!' }]}
                            >
                                <Space.Compact style={{ width: '100%' }}>
                                    <Input
                                        size="middle"
                                        prefix={<LockOutlined />}
                                        placeholder="请输入验证码"
                                    />
                                    <Button >获取验证码</Button>
                                </Space.Compact>
                            </Form.Item>

                            <div className={styles.options}>
                                <Checkbox
                                    checked={autoLogin}
                                    onChange={(e) => setAutoLogin(e.target.checked)}
                                >
                                    自动登录
                                </Checkbox>
                                <a href="#" className={styles.forgotPassword}>忘记密码?</a>
                            </div>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={styles.button}
                                    loading={loading}
                                    block
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>

                <div className={styles.otherLogin}>
                    <div className={styles.otherLoginText}>其他登录方式:</div>
                    <div className={styles.otherLoginIcons}>
                        <div className={`${styles.loginIcon} ${styles.alipay}`}>支</div>
                        <div className={`${styles.loginIcon} ${styles.taobao}`}>淘</div>
                        <div className={`${styles.loginIcon} ${styles.weibo}`}>微</div>
                    </div>
                </div>
            </div>
        </div>
    )
}