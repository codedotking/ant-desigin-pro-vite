import { lazy } from 'react'
import type { ExtendedRouteObject } from './types'

// 懒加载组件
const Layout = lazy(() => import('@/components/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))

// Dashboard 页面
const Analysis = lazy(() => import('@/pages/Dashboard/Analysis'))
const Monitor = lazy(() => import('@/pages/Dashboard/Monitor'))
const Workplace = lazy(() => import('@/pages/Dashboard/Workplace'))

// Form 页面
const BasicForm = lazy(() => import('@/pages/Form/Basic'))
const StepForm = lazy(() => import('@/pages/Form/Step'))
const AdvancedForm = lazy(() => import('@/pages/Form/Advanced'))

// Exception 页面
const ForbiddenPage = lazy(() => import('@/pages/Exception/403'))
const NoFoundPage = lazy(() => import('@/pages/Exception/404'))
const ServerErrorPage = lazy(() => import('@/pages/Exception/500'))

// Result 页面
const SuccessPage = lazy(() => import('@/pages/Result/Success'))
const FailPage = lazy(() => import('@/pages/Result/Fail'))

// Test 页面
const Test = lazy(() => import('@/pages/Test'))

// 路由配置
export const routeConfig: ExtendedRouteObject[] = [
  {
    path: '/',
    element: Layout as any,
    meta: {
      title: '首页',
      requiresAuth: true,
      keepAlive: true
    },
    children: [
      {
        index: true,
        element: () => import('@/pages/Home'),
        meta: {
          title: '欢迎页',
          requiresAuth: true
        }
      },
      {
        path: 'welcome',
        element: Home as any,
        meta: {
          title: '欢迎页',
          requiresAuth: true
        }
      },
      {
        path: 'test',
        element: Test as any,
        meta: {
          title: '测试页',
          requiresAuth: true
        }
      },
      // Dashboard 路由组
      {
        path: 'dashboard',
        meta: {
          title: '仪表盘',
          requiresAuth: true,
          icon: 'DashboardOutlined'
        },
        children: [
          {
            index: true,
            element: () => import('@/pages/Dashboard/Analysis'),
            meta: {
              title: '分析页',
              requiresAuth: true
            }
          },
          {
            path: 'analysis',
            element: Analysis as any,
            meta: {
              title: '分析页',
              requiresAuth: true
            }
          },
          {
            path: 'monitor',
            element: Monitor as any,
            meta: {
              title: '监控页',
              requiresAuth: true
            }
          },
          {
            path: 'workplace',
            element: Workplace as any,
            meta: {
              title: '工作台',
              requiresAuth: true
            }
          }
        ]
      },
      // Form 路由组
      {
        path: 'form',
        meta: {
          title: '表单页',
          requiresAuth: true,
          icon: 'FormOutlined'
        },
        children: [
          {
            index: true,
            element: () => import('@/pages/Form/Basic'),
            meta: {
              title: '基础表单',
              requiresAuth: true
            }
          },
          {
            path: 'basic-form',
            element: BasicForm as any,
            meta: {
              title: '基础表单',
              requiresAuth: true
            }
          },
          {
            path: 'step-form',
            element: StepForm as any,
            meta: {
              title: '分步表单',
              requiresAuth: true
            }
          },
          {
            path: 'advanced-form',
            element: AdvancedForm as any,
            meta: {
              title: '高级表单',
              requiresAuth: true
            }
          }
        ]
      },
      // Result 路由组
      {
        path: 'result',
        meta: {
          title: '结果页',
          requiresAuth: true,
          icon: 'CheckCircleOutlined'
        },
        children: [
          {
            index: true,
            element: () => import('@/pages/Result/Success'),
            meta: {
              title: '成功页',
              requiresAuth: true
            }
          },
          {
            path: 'success',
            element: SuccessPage as any,
            meta: {
              title: '成功页',
              requiresAuth: true
            }
          },
          {
            path: 'fail',
            element: FailPage as any,
            meta: {
              title: '失败页',
              requiresAuth: true
            }
          }
        ]
      },
      // Exception 路由组
      {
        path: 'exception',
        meta: {
          title: '异常页',
          requiresAuth: false,
          icon: 'ExclamationCircleOutlined'
        },
        children: [
          {
            index: true,
            element: () => import('@/pages/Exception/403'),
            meta: {
              title: '403 禁止访问',
              requiresAuth: false
            }
          },
          {
            path: '403',
            element: ForbiddenPage as any,
            meta: {
              title: '403 禁止访问',
              requiresAuth: false
            }
          },
          {
            path: '404',
            element: NoFoundPage as any,
            meta: {
              title: '404 页面不存在',
              requiresAuth: false
            }
          },
          {
            path: '500',
            element: ServerErrorPage as any,
            meta: {
              title: '500 服务器错误',
              requiresAuth: false
            }
          }
        ]
      },
      // 404 兜底路由
      {
        path: '*',
        element: NoFoundPage as any,
        meta: {
          title: '404 页面不存在',
          requiresAuth: false,
          hidden: true
        }
      }
    ]
  },
  {
    path: '/user/login',
    element: Login as any,
    meta: {
      title: '登录',
      requiresAuth: false,
      hidden: true
    }
  }
]

// 路由常量
export const ROUTES = {
  HOME: '/',
  WELCOME: '/welcome',
  LOGIN: '/user/login',
  TEST: '/test',
  DASHBOARD: {
    ROOT: '/dashboard',
    ANALYSIS: '/dashboard/analysis',
    MONITOR: '/dashboard/monitor',
    WORKPLACE: '/dashboard/workplace'
  },
  FORM: {
    ROOT: '/form',
    BASIC: '/form/basic-form',
    STEP: '/form/step-form',
    ADVANCED: '/form/advanced-form'
  },
  RESULT: {
    ROOT: '/result',
    SUCCESS: '/result/success',
    FAIL: '/result/fail'
  },
  EXCEPTION: {
    ROOT: '/exception',
    FORBIDDEN: '/exception/403',
    NOT_FOUND: '/exception/404',
    SERVER_ERROR: '/exception/500'
  }
} as const

// 路由组配置
export const ROUTE_GROUPS = {
  dashboard: {
    title: '仪表盘',
    icon: 'DashboardOutlined',
    order: 1
  },
  form: {
    title: '表单页',
    icon: 'FormOutlined',
    order: 2
  },
  result: {
    title: '结果页',
    icon: 'CheckCircleOutlined',
    order: 3
  },
  exception: {
    title: '异常页',
    icon: 'ExclamationCircleOutlined',
    order: 4
  }
} as const

// 面包屑配置
export const BREADCRUMB_CONFIG = {
  '/': { title: '首页' },
  '/welcome': { title: '欢迎页' },
  '/test': { title: '测试页' },
  '/dashboard': { title: '仪表盘' },
  '/dashboard/analysis': { title: '分析页' },
  '/dashboard/monitor': { title: '监控页' },
  '/dashboard/workplace': { title: '工作台' },
  '/form': { title: '表单页' },
  '/form/basic-form': { title: '基础表单' },
  '/form/step-form': { title: '分步表单' },
  '/form/advanced-form': { title: '高级表单' },
  '/result': { title: '结果页' },
  '/result/success': { title: '成功页' },
  '/result/fail': { title: '失败页' },
  '/exception': { title: '异常页' },
  '/exception/403': { title: '403 禁止访问' },
  '/exception/404': { title: '404 页面不存在' },
  '/exception/500': { title: '500 服务器错误' },
  '/user/login': { title: '登录' }
} as const
