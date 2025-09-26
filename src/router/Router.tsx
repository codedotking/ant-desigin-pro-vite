import { PageLoading } from '@ant-design/pro-components'
import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AuthGuard, PublicGuard } from './guards'
import { routeConfig } from './config'
import { transformRoutes } from './router-utils'

// 处理懒加载组件
const LayoutComponent = typeof routeConfig[0].element === 'function' 
  ? lazy(routeConfig[0].element as () => Promise<{ default: React.ComponentType }>)
  : routeConfig[0].element

const LoginComponent = typeof routeConfig[1].element === 'function'
  ? lazy(routeConfig[1].element as () => Promise<{ default: React.ComponentType }>)
  : routeConfig[1].element

// 创建路由配置
const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoading />}>
        <AuthGuard>
          {typeof LayoutComponent === 'function' ? <LayoutComponent /> : LayoutComponent}
        </AuthGuard>
      </Suspense>
    ),
    children: transformRoutes(routeConfig[0].children || []) as RouteObject[]
  },
  {
    path: '/user/login',
    element: (
      <Suspense fallback={<PageLoading />}>
        <PublicGuard>
          {typeof LoginComponent === 'function' ? <LoginComponent /> : LoginComponent}
        </PublicGuard>
      </Suspense>
    )
  }
])

export default Router