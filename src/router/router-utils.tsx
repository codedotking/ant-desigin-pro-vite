import { PageLoading } from '@ant-design/pro-components'
import { lazy, Suspense } from 'react'
import type { ExtendedRouteObject } from './types'

// 路由转换器：将配置转换为 React Router 格式
export const transformRoutes = (routes: ExtendedRouteObject[]): ExtendedRouteObject[] => {
  return routes.map(route => {
    const transformedRoute: ExtendedRouteObject = {
      path: route.path,
      element: route.element
    }

    // 处理子路由
    if (route.children) {
      transformedRoute.children = route.children.map((child: ExtendedRouteObject) => {
        const transformedChild: ExtendedRouteObject = {
          path: child.path,
          element: child.element
        }

        // 处理 index 路由
        if (child.index) {
          transformedChild.index = true
        }

        // 添加懒加载包装
        if (typeof child.element === 'function') {
          // 处理懒加载函数
          const LazyComponent = lazy(child.element as () => Promise<{ default: React.ComponentType }>)
          transformedChild.element = (
            <Suspense fallback={<PageLoading />}>
              <LazyComponent />
            </Suspense>
          )
        } else if (child.element) {
          transformedChild.element = (
            <Suspense fallback={<PageLoading />}>
              {child.element}
            </Suspense>
          )
        }

        return transformedChild
      })
    }

    // 添加懒加载包装
    if (typeof route.element === 'function') {
      // 处理懒加载函数
      const LazyComponent = lazy(route.element as () => Promise<{ default: React.ComponentType }>)
      transformedRoute.element = (
        <Suspense fallback={<PageLoading />}>
          <LazyComponent />
        </Suspense>
      )
    } else if (route.element) {
      transformedRoute.element = (
        <Suspense fallback={<PageLoading />}>
          {route.element}
        </Suspense>
      )
    }

    return transformedRoute
  })
}
