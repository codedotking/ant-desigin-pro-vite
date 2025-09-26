// 路由模块统一导出
export { routeConfig } from './config'
export { ROUTES, ROUTE_GROUPS, BREADCRUMB_CONFIG } from './constants'
export { default as Router } from './Router'
export { useRouter, useRouteGuard, useBreadcrumb } from './hooks'
export { 
  AuthGuard, 
  PublicGuard, 
  RoleGuard, 
  PermissionGuard,
  Guard
} from './guards'
export { usePermissionCheck } from './guards-hooks'
export { PageTitle } from './guards-utils'
export { useBreadcrumb as useBreadcrumbNew, breadcrumbUtils } from './breadcrumb'

export type {
  ExtendedRouteObject,
  RouteMeta,
  BreadcrumbItem,
  GuardConfig,
  NavigationOptions,
  RouterState,
  RouteGroupConfig,
  RouteCacheItem,
  PreloadConfig,
  PermissionCheckResult
} from './types'

export {
  isActiveRoute,
  getRouteDepth,
  isSubRoute,
  getParentRoute,
  generatePath,
  parseQuery,
  buildQuery,
  getRouteGroup,
  requiresAuth,
  getDefaultRedirect,
  isValidRoute,
  buildFullUrl,
  RouteCache,
  RoutePreloader,
  RouteHistory,
  routeCache,
  routeHistory
} from './utils'
