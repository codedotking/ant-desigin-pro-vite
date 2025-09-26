import { ROUTES } from './config'
import type { GuardConfig, PermissionCheckResult } from './types'

// 权限检查工具函数
export const checkPermission = (
  config: GuardConfig,
  isAuthenticated: boolean,
  userRole?: string,
  userPermissions?: string[]
): PermissionCheckResult => {
  // 检查是否需要认证
  if (config.requiresAuth && !isAuthenticated) {
    return {
      hasPermission: false,
      redirectTo: ROUTES.LOGIN
    }
  }

  // 检查角色权限
  if (config.roles && config.roles.length > 0) {
    if (!userRole || !config.roles.includes(userRole)) {
      return {
        hasPermission: false,
        missingRoles: config.roles.filter(role => role !== userRole),
        redirectTo: ROUTES.EXCEPTION.FORBIDDEN
      }
    }
  }

  // 检查具体权限
  if (config.permissions && config.permissions.length > 0) {
    const permissions = userPermissions || []
    const missingPermissions = config.permissions.filter(
      permission => !permissions.includes(permission)
    )
    
    if (missingPermissions.length > 0) {
      return {
        hasPermission: false,
        missingPermissions,
        redirectTo: ROUTES.EXCEPTION.FORBIDDEN
      }
    }
  }

  return { hasPermission: true }
}

// 获取页面标题
export const PageTitle = (pathname: string): string => {
  const titleMap: Record<string, string> = {
    [ROUTES.WELCOME]: '欢迎页',
    [ROUTES.DASHBOARD.ANALYSIS]: '分析页',
    [ROUTES.DASHBOARD.MONITOR]: '监控页',
    [ROUTES.DASHBOARD.WORKPLACE]: '工作台',
    [ROUTES.FORM.BASIC]: '基础表单',
    [ROUTES.FORM.STEP]: '分步表单',
    [ROUTES.FORM.ADVANCED]: '高级表单',
    [ROUTES.RESULT.SUCCESS]: '成功页',
    [ROUTES.RESULT.FAIL]: '失败页',
    [ROUTES.EXCEPTION.FORBIDDEN]: '403 禁止访问',
    [ROUTES.EXCEPTION.NOT_FOUND]: '404 页面不存在',
    [ROUTES.EXCEPTION.SERVER_ERROR]: '500 服务器错误',
    [ROUTES.LOGIN]: '登录'
  }

  return titleMap[pathname] || '未知页面'
}
