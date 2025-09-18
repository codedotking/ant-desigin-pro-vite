import { checkIsLoggedIn } from '@/stores';
import { request } from '@/utils';

const api = {
    login: '/api/login/account',
    currentUser: '/api/currentUser',
    captcha: '/api/login/captcha',
}

//登录  
export const login = async (params: unknown) => {
    console.log('login 函数被调用，参数:', params);
    const result = await request.post(api.login, params);
    console.log('login 函数返回结果:', result);
    return result;
}

//获取用户信息
export const getCurrentUser = () => {
    console.log(checkIsLoggedIn());
    if (!checkIsLoggedIn()) return Promise.reject(new Error('用户未登录'));
    return request.get(api.currentUser);
}

//获取验证码
export const getCaptcha = async (params: unknown) => {
    const result = await request.post(api.captcha, params);
    return result;
}

