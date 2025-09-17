// API 类型定义
export interface LoginParams {
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  type: string;
}

export interface LoginResult {
  status?: string;
  type?: string;
  currentAuthority?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
}
