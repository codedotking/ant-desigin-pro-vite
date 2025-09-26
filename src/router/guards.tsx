import { Navigate, useLocation } from 'react-router-dom'
import { useIsLoggedIn, useUser } from '@/stores/user'
import { ROUTES } from './constants'
import { usePermissionCheck } from './guards-hooks'
import type { GuardConfig } from './types'

// 权限守卫组件
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useIsLoggedIn()
  const location = useLocation()

  if (!isAuthenticated) {
    // 保存当前路径，登录后可以重定向回来
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}

// 公开路由守卫（已登录用户访问登录页时重定向）
export const PublicGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useIsLoggedIn()
  const location = useLocation()

  if (isAuthenticated) {
    // 从登录页重定向到原来要访问的页面，或默认首页
    const from = location.state?.from?.pathname || ROUTES.WELCOME
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}

// 角色权限守卫
export const RoleGuard = ({
  children,
  requiredRoles,
  fallback: Fallback
}: {
  children: React.ReactNode
  requiredRoles?: string[]
  fallback?: React.ComponentType
}) => {
  const user = useUser()

  if (requiredRoles && user?.role && !requiredRoles.includes(user.role)) {
    return Fallback ? <Fallback /> : <Navigate to={ROUTES.EXCEPTION.FORBIDDEN} replace />
  }

  return <>{children}</>
}

// 权限守卫
export const PermissionGuard = ({
  children,
  permissions,
  fallback: Fallback
}: {
  children: React.ReactNode
  permissions?: string[]
  fallback?: React.ComponentType
}) => {
  const user = useUser()

  if (permissions && permissions.length > 0) {
    const userPermissions = user?.permissions || []
    const hasPermission = permissions.every(permission => 
      userPermissions.includes(permission)
    )

    if (!hasPermission) {
      return Fallback ? <Fallback /> : <Navigate to={ROUTES.EXCEPTION.FORBIDDEN} replace />
    }
  }

  return <>{children}</>
}

// 通用权限守卫
export const Guard = ({
  children,
  config,
  fallback: Fallback
}: {
  children: React.ReactNode
  config: GuardConfig
  fallback?: React.ComponentType
}) => {
  const { checkPermission } = usePermissionCheck()
  const result = checkPermission(config)

  if (!result.hasPermission) {
    if (result.redirectTo) {
      return <Navigate to={result.redirectTo} replace />
    }
    return Fallback ? <Fallback /> : <Navigate to={ROUTES.EXCEPTION.FORBIDDEN} replace />
  }

  return <>{children}</>
}

// 重新导出工具函数
export { PageTitle } from './guards-utils'
