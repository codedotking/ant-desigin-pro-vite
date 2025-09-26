import { useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { BREADCRUMB_CONFIG, ROUTES } from './config'
import type { BreadcrumbItem } from './types'

// 面包屑导航 Hook
export const useBreadcrumb = () => {
  const { pathname } = useLocation()

  const getBreadcrumbItems = useCallback((): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // 添加首页面包屑
    if (pathname !== ROUTES.HOME) {
      breadcrumbs.push({
        title: '首页',
        path: ROUTES.HOME,
        icon: 'HomeOutlined'
      })
    }

    // 根据路径生成面包屑
    let currentPath = ''
    
    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`
      
      // 查找配置中的面包屑信息
      const config = BREADCRUMB_CONFIG[currentPath as keyof typeof BREADCRUMB_CONFIG]
      
      if (config) {
        breadcrumbs.push({
          title: config.title,
          path: currentPath,
          disabled: i === pathSegments.length - 1 // 最后一项不可点击
        })
      }
    }

    return breadcrumbs
  }, [pathname])

  // 获取当前页面的面包屑
  const currentBreadcrumb = useMemo(() => {
    const items = getBreadcrumbItems()
    return items[items.length - 1] || null
  }, [getBreadcrumbItems])

  // 获取父级面包屑
  const parentBreadcrumb = useMemo(() => {
    const items = getBreadcrumbItems()
    return items.length > 1 ? items[items.length - 2] : null
  }, [getBreadcrumbItems])

  // 检查是否为根路径
  const isRootPath = useMemo(() => {
    return pathname === ROUTES.HOME || pathname === ROUTES.WELCOME
  }, [pathname])

  // 获取面包屑层级深度
  const breadcrumbDepth = useMemo(() => {
    return getBreadcrumbItems().length
  }, [getBreadcrumbItems])

  return {
    breadcrumbItems: getBreadcrumbItems(),
    currentBreadcrumb,
    parentBreadcrumb,
    isRootPath,
    breadcrumbDepth
  }
}

// 面包屑工具函数
export const breadcrumbUtils = {
  // 根据路径获取面包屑配置
  getBreadcrumbConfig: (path: string) => {
    return BREADCRUMB_CONFIG[path as keyof typeof BREADCRUMB_CONFIG]
  },

  // 生成面包屑路径
  generateBreadcrumbPath: (segments: string[]): string => {
    return '/' + segments.join('/')
  },

  // 检查路径是否在面包屑中
  isBreadcrumbPath: (path: string): boolean => {
    return path in BREADCRUMB_CONFIG
  },

  // 获取路径的所有父级路径
  getParentPaths: (path: string): string[] => {
    const segments = path.split('/').filter(Boolean)
    const parentPaths: string[] = []
    
    for (let i = 1; i <= segments.length; i++) {
      const parentPath = '/' + segments.slice(0, i).join('/')
      parentPaths.push(parentPath)
    }
    
    return parentPaths
  },

  // 获取路径的层级深度
  getPathDepth: (path: string): number => {
    return path.split('/').filter(Boolean).length
  }
}
