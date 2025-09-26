import { useIsLoggedIn, useUser } from '@/stores/user'
import { checkPermission as checkPermissionUtil } from './guards-utils'
import type { GuardConfig } from './types'

// 权限检查 Hook
export const usePermissionCheck = () => {
  const user = useUser()
  const isAuthenticated = useIsLoggedIn()

  const checkPermission = (config: GuardConfig) => {
    return checkPermissionUtil(config, isAuthenticated, user?.role, user?.permissions)
  }

  return { checkPermission }
}
