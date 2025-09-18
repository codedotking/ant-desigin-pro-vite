import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ProConfigProvider, ProLayout, SettingDrawer, type Settings } from '@ant-design/pro-components'
import { useAppSettings, useUser } from '@/stores'
import { AvatarDropdown, AvatarName } from '../RightContent/AvatarDropdown'
import { Question, SelectLang } from '../RightContent'
import Footer from '../Footer'
import { LinkOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons'
import { ConfigProvider, Input, theme } from 'antd'

import type React from 'react'
import _defaultProps from './_defaultProps'
import { useState } from 'react'



const isDev = process.env.NODE_ENV === 'development';
const isDevOrTest = isDev || process.env.CI;
const loginPath = '/user/login';




const ChildrenRender: React.FC = () => {
  const settings = useAppSettings()

  // if (initialState?.loading) return <PageLoading />;
  return (
    <>
      <Outlet />
      {isDevOrTest && (
        <SettingDrawer
          disableUrlParams
          enableDarkTheme
          settings={settings as Partial<Settings>}
        // onSettingChange={(settings) => {
        //   setSettings((preInitialState) => ({
        //     ...preInitialState,
        //     settings,
        //   }));
        // }}
        />
      )}
    </>
  );
}


export function Layout() {
  const settings = useAppSettings()
  const currentUser = useUser()

  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)

  const navigate = useNavigate()


  const layout = {
    waterMarkProps: {
      content: currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== loginPath) {
        navigate(loginPath);
      }
    },
    links: isDevOrTest
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    children: <ChildrenRender />,
    ...settings,
    ..._defaultProps
  }


  return (
    <ProConfigProvider hashed={false}>
      <ConfigProvider
        getTargetContainer={() => {
          return document.getElementById('test-pro-layout') || document.body;
        }}
      >
        <ProLayout

          actionsRender={
            () => [
              // 文档
              <Question key="doc" />,
              // 国际化切换
              <SelectLang key="SelectLang" />,
            ]
          }
          {...layout}

          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          location={{
            pathname,
          }}
          token={{
            header: {
              colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
            },
          }}
          siderMenuType="group"
          menu={{
            collapsedShowGroupTitle: true,
          }}

          avatarProps={{
            src: currentUser?.avatar,
            title: <AvatarName />,
            render: (_: unknown, avatarChildren: React.ReactNode) => (
              <AvatarDropdown>{avatarChildren}</AvatarDropdown>
            ),
          }}


          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </div>
          )} />
      </ConfigProvider>
    </ProConfigProvider>
  )
}



export const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};