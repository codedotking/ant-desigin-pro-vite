# 路由系统重构说明

## 重构亮点

### 1. 模块化架构
- **分离关注点**: 路由配置、守卫、工具函数分别独立
- **类型安全**: 完整的 TypeScript 类型定义
- **懒加载**: 所有页面组件都使用 React.lazy 懒加载

### 2. 路由守卫系统
```tsx
// 认证守卫 - 保护需要登录的页面
<AuthGuard>
  <ProtectedPage />
</AuthGuard>

// 公开守卫 - 已登录用户访问登录页时重定向
<PublicGuard>
  <LoginPage />
</PublicGuard>

// 角色守卫 - 基于用户角色的权限控制
<RoleGuard requiredRoles={['admin', 'editor']}>
  <AdminPage />
</RoleGuard>
```

### 3. 路由 Hooks
```tsx
// 路由导航
const { goTo, goBack, replace } = useRouter()

// 路由守卫检查
const { isDashboardRoute, isPublicRoute } = useRouteGuard()

// 面包屑导航
const { breadcrumbItems } = useBreadcrumb()
```

### 4. 路由常量
```tsx
import { ROUTES } from '@/router'

// 使用常量避免硬编码
navigate(ROUTES.DASHBOARD.ANALYSIS)
```

### 5. 工具函数
```tsx
import { isActiveRoute, getRouteGroup, requiresAuth } from '@/router'

// 检查路由是否活跃
const isActive = isActiveRoute(currentPath, '/dashboard')

// 获取路由组别
const group = getRouteGroup('/dashboard/analysis') // 'dashboard'

// 检查是否需要认证
const needsAuth = requiresAuth('/dashboard') // true
```

## 文件结构

```
src/router/
├── index.tsx          # 主路由配置
├── routes.ts          # 路由定义
├── guards.tsx         # 路由守卫组件
├── hooks.ts           # 路由相关 Hooks
├── utils.ts           # 路由工具函数
├── types.ts           # 类型定义
├── components.tsx     # 路由相关组件
└── index.ts           # 统一导出
```

## 使用方式

### 基本导航
```tsx
import { useRouter } from '@/router'

function MyComponent() {
  const { goTo, goBack } = useRouter()
  
  return (
    <div>
      <button onClick={() => goTo('/dashboard')}>去仪表盘</button>
      <button onClick={goBack}>返回</button>
    </div>
  )
}
```

### 面包屑导航
```tsx
import { useBreadcrumb } from '@/router'

function Breadcrumb() {
  const { breadcrumbItems } = useBreadcrumb()
  
  return (
    <nav>
      {breadcrumbItems.map(item => (
        <span key={item.path}>{item.title}</span>
      ))}
    </nav>
  )
}
```

### 路由守卫
```tsx
import { AuthGuard, RoleGuard } from '@/router'

function App() {
  return (
    <AuthGuard>
      <RoleGuard requiredRoles={['admin']}>
        <AdminPanel />
      </RoleGuard>
    </AuthGuard>
  )
}
```

## 性能优化

1. **懒加载**: 所有页面组件都使用 React.lazy 懒加载
2. **代码分割**: 按路由自动分割代码
3. **加载状态**: 统一的页面加载组件
4. **缓存**: 支持路由缓存配置

## 扩展性

- 新增路由只需在 `routes.ts` 中添加
- 新增守卫只需在 `guards.tsx` 中实现
- 新增工具函数在 `utils.ts` 中添加
- 类型定义在 `types.ts` 中维护
