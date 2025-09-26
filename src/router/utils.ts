import { ROUTES } from './config'
import type { NavigationOptions, RouteCacheItem, PreloadConfig } from './types'

// 路由工具函数

/**
 * 检查路径是否为活跃路由
 */
export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  if (targetPath === ROUTES.HOME) {
    return currentPath === ROUTES.HOME || currentPath === ROUTES.WELCOME
  }
  return currentPath.startsWith(targetPath)
}

/**
 * 获取路由层级深度
 */
export const getRouteDepth = (path: string): number => {
  return path.split('/').filter(Boolean).length
}

/**
 * 检查是否为子路由
 */
export const isSubRoute = (parentPath: string, childPath: string): boolean => {
  return childPath.startsWith(parentPath) && childPath !== parentPath
}

/**
 * 获取父路由路径
 */
export const getParentRoute = (path: string): string => {
  const segments = path.split('/').filter(Boolean)
  if (segments.length <= 1) return ROUTES.HOME
  return '/' + segments.slice(0, -1).join('/')
}

/**
 * 生成路由路径（支持参数替换）
 */
export const generatePath = (path: string, params: Record<string, string | number> = {}): string => {
  let generatedPath = path
  
  Object.entries(params).forEach(([key, value]) => {
    generatedPath = generatedPath.replace(`:${key}`, String(value))
  })
  
  return generatedPath
}

/**
 * 解析查询参数
 */
export const parseQuery = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

/**
 * 构建查询字符串
 */
export const buildQuery = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })
  
  return searchParams.toString()
}

/**
 * 获取路由组别
 */
export const getRouteGroup = (path: string): string | null => {
  if (path.startsWith(ROUTES.DASHBOARD.ROOT)) return 'dashboard'
  if (path.startsWith(ROUTES.FORM.ROOT)) return 'form'
  if (path.startsWith(ROUTES.RESULT.ROOT)) return 'result'
  if (path.startsWith(ROUTES.EXCEPTION.ROOT)) return 'exception'
  return null
}

/**
 * 检查路由是否需要认证
 */
export const requiresAuth = (path: string): boolean => {
  const publicRoutes = [
    ROUTES.LOGIN,
    ROUTES.EXCEPTION.NOT_FOUND,
    ROUTES.EXCEPTION.SERVER_ERROR
  ]
  
  return !publicRoutes.some(route => path.startsWith(route))
}

/**
 * 获取默认重定向路径
 */
export const getDefaultRedirect = (group: string): string => {
  const defaultRedirects: Record<string, string> = {
    dashboard: ROUTES.DASHBOARD.ANALYSIS,
    form: ROUTES.FORM.BASIC,
    result: ROUTES.RESULT.SUCCESS,
    exception: ROUTES.EXCEPTION.FORBIDDEN
  }
  
  return defaultRedirects[group] || ROUTES.WELCOME
}

/**
 * 路由路径验证
 */
export const isValidRoute = (path: string): boolean => {
  const validRoutes = [
    ROUTES.HOME,
    ROUTES.WELCOME,
    ROUTES.LOGIN,
    ROUTES.TEST,
    ...Object.values(ROUTES.DASHBOARD),
    ...Object.values(ROUTES.FORM),
    ...Object.values(ROUTES.RESULT),
    ...Object.values(ROUTES.EXCEPTION)
  ]
  
  return validRoutes.some(route => path === route || path.startsWith(route + '/'))
}

/**
 * 构建完整URL（包含查询参数和hash）
 */
export const buildFullUrl = (path: string, options: NavigationOptions = {}): string => {
  let url = path
  
  // 添加查询参数
  if (options.query && Object.keys(options.query).length > 0) {
    const queryString = buildQuery(options.query)
    url += `?${queryString}`
  }
  
  // 添加hash
  if (options.hash) {
    url += `#${options.hash}`
  }
  
  return url
}

/**
 * 路由缓存管理
 */
export class RouteCache {
  private cache = new Map<string, RouteCacheItem>()
  private maxSize = 10

  set(path: string, component: React.ComponentType, keepAlive = false): void {
    if (this.cache.size >= this.maxSize) {
      // 删除最旧的缓存项
      const oldestKey = this.cache.keys().next().value
      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }

    this.cache.set(path, {
      path,
      component,
      timestamp: Date.now(),
      keepAlive
    })
  }

  get(path: string): RouteCacheItem | undefined {
    return this.cache.get(path)
  }

  has(path: string): boolean {
    return this.cache.has(path)
  }

  delete(path: string): boolean {
    return this.cache.delete(path)
  }

  clear(): void {
    this.cache.clear()
  }

  getKeepAliveRoutes(): RouteCacheItem[] {
    return Array.from(this.cache.values()).filter(item => item.keepAlive)
  }
}

/**
 * 路由预加载管理
 */
export class RoutePreloader {
  private preloadedRoutes = new Set<string>()
  private preloadConfig: PreloadConfig

  constructor(config: PreloadConfig) {
    this.preloadConfig = config
  }

  async preloadRoute(path: string): Promise<void> {
    if (this.preloadedRoutes.has(path)) {
      return
    }

    try {
      // 这里可以根据路径动态导入组件
      // 实际实现需要根据你的路由配置来调整
      this.preloadedRoutes.add(path)
    } catch (error) {
      console.warn(`Failed to preload route: ${path}`, error)
    }
  }

  async preloadRoutes(): Promise<void> {
    const { paths, delay = 0 } = this.preloadConfig
    
    for (const path of paths) {
      await this.preloadRoute(path)
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  isPreloaded(path: string): boolean {
    return this.preloadedRoutes.has(path)
  }
}

/**
 * 路由历史管理
 */
export class RouteHistory {
  private history: string[] = []
  private maxSize = 50

  push(path: string): void {
    // 避免重复添加相同路径
    if (this.history[this.history.length - 1] !== path) {
      this.history.push(path)
      
      // 限制历史记录大小
      if (this.history.length > this.maxSize) {
        this.history.shift()
      }
    }
  }

  getHistory(): string[] {
    return [...this.history]
  }

  getPreviousPath(): string | null {
    return this.history.length > 1 ? this.history[this.history.length - 2] : null
  }

  clear(): void {
    this.history = []
  }
}

// 全局实例
export const routeCache = new RouteCache()
export const routeHistory = new RouteHistory()
