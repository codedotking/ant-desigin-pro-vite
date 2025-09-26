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
