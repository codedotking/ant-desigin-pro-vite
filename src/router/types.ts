import type { RouteObject, NavigateOptions } from 'react-router-dom'

// 路由元信息类型
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  keepAlive?: boolean
  hidden?: boolean
  icon?: string
  order?: number
  cache?: boolean
  preload?: boolean
  permissions?: string[]
}

// 扩展路由对象类型
export interface ExtendedRouteObject extends Omit<RouteObject, 'children' | 'lazy' | 'element'> {
  meta?: RouteMeta
  children?: ExtendedRouteObject[]
  element?: React.ReactNode | (() => Promise<any>)
  lazy?: () => Promise<{ default: React.ComponentType<any> }>
}

// 面包屑项类型
export interface BreadcrumbItem {
  title: string
  path: string
  icon?: string
  disabled?: boolean
}

// 路由守卫配置类型
export interface GuardConfig {
  requiresAuth?: boolean
  roles?: string[]
  permissions?: string[]
  redirectTo?: string
  fallback?: React.ComponentType
}

// 路由导航选项类型
export interface NavigationOptions extends NavigateOptions {
  replace?: boolean
  state?: any
  preventScrollReset?: boolean
  relative?: 'route' | 'path'
  query?: Record<string, string | number | boolean>
  hash?: string
}

// 路由状态类型
export interface RouterState {
  from?: {
    pathname: string
    search: string
    hash: string
    state: any
    key: string
  }
  [key: string]: any
}

// 路由组配置类型
export interface RouteGroupConfig {
  title: string
  icon: string
  order: number
  hidden?: boolean
}

// 路由缓存项类型
export interface RouteCacheItem {
  path: string
  component: React.ComponentType
  timestamp: number
  keepAlive: boolean
}

// 路由预加载配置类型
export interface PreloadConfig {
  paths: string[]
  delay?: number
  priority?: 'high' | 'normal' | 'low'
}

// 路由权限检查结果类型
export interface PermissionCheckResult {
  hasPermission: boolean
  missingRoles?: string[]
  missingPermissions?: string[]
  redirectTo?: string
}
