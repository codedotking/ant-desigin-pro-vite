import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { ROUTES } from './config'
import { buildFullUrl, routeHistory } from './utils'
import type { NavigationOptions } from './types'

// 路由导航 Hook
export const useRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const goTo = useCallback((path: string, options?: NavigationOptions) => {
    // 记录路由历史
    routeHistory.push(path)
    
    // 构建完整URL
    const fullUrl = buildFullUrl(path, options)
    
    // 导航到目标路径
    navigate(fullUrl, {
      replace: options?.replace,
      state: options?.state,
      preventScrollReset: options?.preventScrollReset,
      relative: options?.relative
    })
  }, [navigate])

  const goBack = useCallback(() => {
    const previousPath = routeHistory.getPreviousPath()
    if (previousPath) {
      routeHistory.push(previousPath)
    }
    navigate(-1)
  }, [navigate])

  const goForward = useCallback(() => {
    navigate(1)
  }, [navigate])

  const replace = useCallback((path: string, options?: Omit<NavigationOptions, 'replace'>) => {
    routeHistory.push(path)
    const fullUrl = buildFullUrl(path, options)
    navigate(fullUrl, { replace: true, state: options?.state })
  }, [navigate])

  const goToWithQuery = useCallback((path: string, query: Record<string, string | number | boolean>, options?: Omit<NavigationOptions, 'query'>) => {
    goTo(path, { ...options, query })
  }, [goTo])

  const goToWithHash = useCallback((path: string, hash: string, options?: Omit<NavigationOptions, 'hash'>) => {
    goTo(path, { ...options, hash })
  }, [goTo])

  // 获取路由历史
  const getHistory = useCallback(() => {
    return routeHistory.getHistory()
  }, [])

  // 检查是否为活跃路由
  const isActiveRoute = useCallback((targetPath: string) => {
    if (targetPath === ROUTES.HOME) {
      return location.pathname === ROUTES.HOME || location.pathname === ROUTES.WELCOME
    }
    return location.pathname.startsWith(targetPath)
  }, [location.pathname])

  return {
    goTo,
    goBack,
    goForward,
    replace,
    goToWithQuery,
    goToWithHash,
    getHistory,
    isActiveRoute,
    location,
    params,
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state
  }
}

// 路由守卫 Hook
export const useRouteGuard = () => {
  const { pathname } = useLocation()

  const isPublicRoute = useCallback((path: string) => {
    const publicRoutes = [ROUTES.LOGIN, ROUTES.EXCEPTION.NOT_FOUND, ROUTES.EXCEPTION.SERVER_ERROR] as const

    return publicRoutes.includes(path as (typeof publicRoutes)[number])
  }, [])

  const isDashboardRoute = useCallback((path: string) => {
    return path.startsWith(ROUTES.DASHBOARD.ROOT)
  }, [])

  const isFormRoute = useCallback((path: string) => {
    return path.startsWith(ROUTES.FORM.ROOT)
  }, [])

  const isResultRoute = useCallback((path: string) => {
    return path.startsWith(ROUTES.RESULT.ROOT)
  }, [])

  const isExceptionRoute = useCallback((path: string) => {
    return path.startsWith(ROUTES.EXCEPTION.ROOT)
  }, [])

  return {
    isPublicRoute: () => isPublicRoute(pathname),
    isDashboardRoute: () => isDashboardRoute(pathname),
    isFormRoute: () => isFormRoute(pathname),
    isResultRoute: () => isResultRoute(pathname),
    isExceptionRoute: () => isExceptionRoute(pathname),
    currentPath: pathname
  }
}

// 面包屑导航 Hook（使用新的面包屑模块）
export const useBreadcrumb = () => {
  const { pathname } = useLocation()

  const getBreadcrumbItems = useCallback(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []

    // 根据路径生成面包屑
    if (pathSegments.includes('dashboard')) {
      breadcrumbs.push({ title: '仪表盘', path: ROUTES.DASHBOARD.ROOT })

      if (pathSegments.includes('analysis')) {
        breadcrumbs.push({ title: '分析页', path: ROUTES.DASHBOARD.ANALYSIS })
      } else if (pathSegments.includes('monitor')) {
        breadcrumbs.push({ title: '监控页', path: ROUTES.DASHBOARD.MONITOR })
      } else if (pathSegments.includes('workplace')) {
        breadcrumbs.push({ title: '工作台', path: ROUTES.DASHBOARD.WORKPLACE })
      }
    } else if (pathSegments.includes('form')) {
      breadcrumbs.push({ title: '表单页', path: ROUTES.FORM.ROOT })

      if (pathSegments.includes('basic-form')) {
        breadcrumbs.push({ title: '基础表单', path: ROUTES.FORM.BASIC })
      } else if (pathSegments.includes('step-form')) {
        breadcrumbs.push({ title: '分步表单', path: ROUTES.FORM.STEP })
      } else if (pathSegments.includes('advanced-form')) {
        breadcrumbs.push({ title: '高级表单', path: ROUTES.FORM.ADVANCED })
      }
    } else if (pathSegments.includes('result')) {
      breadcrumbs.push({ title: '结果页', path: ROUTES.RESULT.ROOT })

      if (pathSegments.includes('success')) {
        breadcrumbs.push({ title: '成功页', path: ROUTES.RESULT.SUCCESS })
      } else if (pathSegments.includes('fail')) {
        breadcrumbs.push({ title: '失败页', path: ROUTES.RESULT.FAIL })
      }
    } else if (pathSegments.includes('exception')) {
      breadcrumbs.push({ title: '异常页', path: ROUTES.EXCEPTION.ROOT })

      if (pathSegments.includes('403')) {
        breadcrumbs.push({ title: '403 禁止访问', path: ROUTES.EXCEPTION.FORBIDDEN })
      } else if (pathSegments.includes('404')) {
        breadcrumbs.push({ title: '404 页面不存在', path: ROUTES.EXCEPTION.NOT_FOUND })
      } else if (pathSegments.includes('500')) {
        breadcrumbs.push({ title: '500 服务器错误', path: ROUTES.EXCEPTION.SERVER_ERROR })
      }
    }

    return breadcrumbs
  }, [pathname])

  return {
    breadcrumbItems: getBreadcrumbItems()
  }
}
