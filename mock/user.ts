// mock/user.ts



const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access =
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
    return access;
};

const createUserList = () => {
    return [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ]
}

export default [
    // 获取当前用户信息
    {
        url: '/api/currentUser',
        method: 'get',
        response: () => {
            if (!getAccess()) {
                return {
                    data: {
                        isLogin: false,
                    },
                    errorCode: '401',
                    errorMessage: '请先登录！',
                    success: true,
                };
            }
            return {
                success: true,
                data: {
                    name: 'Serati Ma',
                    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                    userid: '00000001',
                    email: 'antdesign@alipay.com',
                    signature: '海纳百川，有容乃大',
                    title: '交互专家',
                    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
                    tags: [
                        {
                            key: '0',
                            label: '很有想法的',
                        },
                        {
                            key: '1',
                            label: '专注设计',
                        },
                        {
                            key: '2',
                            label: '辣~',
                        },
                        {
                            key: '3',
                            label: '大长腿',
                        },
                        {
                            key: '4',
                            label: '川妹子',
                        },
                        {
                            key: '5',
                            label: '海纳百川',
                        },
                    ],
                    notifyCount: 12,
                    unreadCount: 11,
                    country: 'China',
                    access: getAccess(),
                    geographic: {
                        province: {
                            label: '浙江省',
                            key: '330000',
                        },
                        city: {
                            label: '杭州市',
                            key: '330100',
                        },
                    },
                    address: '西湖区工专路 77 号',
                    phone: '0752-268888888',
                },
            };
        }
    },
    // 获取用户列表
    {
        url: '/api/users',
        method: 'get',
        response: () => {
            return createUserList();
        }
    },
    // 用户登录
    {
        url: '/api/login/account',
        method: 'post',
        timeout: 1000,
        response: ({ body }: { body: { password: string, username: string, type: string } }) => {
            const { password, username, type } = body;
            if (password === 'ant.design' && username === 'admin') {
                access = 'admin';
                console.log('admin');
                return {
                    status: 'ok',
                    type,
                    currentAuthority: 'admin',
                };
            }
            if (password === 'ant.design' && username === 'user') {
                access = 'user';
                return {
                    status: 'ok',
                    type,
                    currentAuthority: 'user',
                };
            }
            if (type === 'mobile') {
                access = 'admin';
                return {
                    status: 'ok',
                    type,
                    currentAuthority: 'admin',
                };
            }

            access = 'guest';
            return {
                status: 'error',
                type,
                currentAuthority: 'guest',
            };
        }
    },
    // 用户登出
    {
        url: '/api/login/outLogin',
        method: 'post',
        response: () => {
            access = '';
            return { data: {}, success: true };
        }
    },
    // 用户注册
    {
        url: '/api/register',
        method: 'post',
        timeout: 1000,
        response: () => {
            return { status: 'ok', currentAuthority: 'user', success: true };
        }
    },
    // 获取验证码
    {
        url: '/api/login/captcha',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                success: true,
                data: {
                    captcha: 'captcha-xxx'
                }
            };
        }
    },
    // 错误状态码接口
    {
        url: '/api/500',
        method: 'get',
        response: () => {
            return {
                timestamp: 1513932555104,
                status: 500,
                error: 'error',
                message: 'error',
                path: '/base/category/list',
            };
        }
    },
    {
        url: '/api/404',
        method: 'get',
        response: () => {
            return {
                timestamp: 1513932643431,
                status: 404,
                error: 'Not Found',
                message: 'No message available',
                path: '/base/category/list/2121212',
            };
        }
    },
    {
        url: '/api/403',
        method: 'get',
        response: () => {
            return {
                timestamp: 1513932555104,
                status: 403,
                error: 'Forbidden',
                message: 'Forbidden',
                path: '/base/category/list',
            };
        }
    },
    {
        url: '/api/401',
        method: 'get',
        response: () => {
            return {
                timestamp: 1513932555104,
                status: 401,
                error: 'Unauthorized',
                message: 'Unauthorized',
                path: '/base/category/list',
            };
        }
    }
]
