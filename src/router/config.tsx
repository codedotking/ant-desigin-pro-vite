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
    element: <Layout/>,
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
        element: <Home />,
        meta: {
          title: '欢迎页',
          requiresAuth: true
        }
      },
      {
        path: 'test',
        element: <Test />,
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
            element: <Analysis />,
            meta: {
              title: '分析页',
              requiresAuth: true
            }
          },
          {
            path: 'monitor',
            element: <Monitor />,
            meta: {
              title: '监控页',
              requiresAuth: true
            }
          },
          {
            path: 'workplace',
            element: <Workplace />,
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
            element: <BasicForm />,
            meta: {
              title: '基础表单',
              requiresAuth: true
            }
          },
          {
            path: 'step-form',
            element: <StepForm />,
            meta: {
              title: '分步表单',
              requiresAuth: true
            }
          },
          {
            path: 'advanced-form',
            element: <AdvancedForm />,
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
            element: <SuccessPage />,
            meta: {
              title: '成功页',
              requiresAuth: true
            }
          },
          {
            path: 'fail',
            element: <FailPage />,
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
            element: <ForbiddenPage />,
            meta: {
              title: '403 禁止访问',
              requiresAuth: false
            }
          },
          {
            path: '404',
            element: <NoFoundPage />,
            meta: {
              title: '404 页面不存在',
              requiresAuth: false
            }
          },
          {
            path: '500',
            element: <ServerErrorPage />,
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
        element: <NoFoundPage />,
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
    element: <Login />,
    meta: {
      title: '登录',
      requiresAuth: false,
      hidden: true
    }
  }
]
