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

export type UserInfo = Partial<{
  name: string;
  avatar: string;
  userid: string;
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: {
    key: string;
    label: string;
  }[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: {
    province: {
      label: string;
      key: string;
    };
    city: {
      label: string;
      key: string;
    };
  };
  address: string;
  phone: string;
}>;
