# 路由系统优化总结

## 优化内容

### 1. 路由配置结构优化 ✅
- **新增文件**: `src/router/config.ts`
- **优化内容**:
  - 使用配置驱动的方式管理路由
  - 支持路由元信息（meta）配置
  - 统一管理路由常量和面包屑配置
  - 支持路由组配置和排序

### 2. 路由守卫重构 ✅
- **优化文件**: `src/router/guards.tsx`
- **新增文件**: `src/router/guards-utils.ts`, `src/router/guards-hooks.ts`
- **优化内容**:
  - 增加更细粒度的权限控制
  - 支持角色权限和具体权限检查
  - 新增 `PermissionGuard` 和 `Guard` 组件
  - 分离工具函数和 Hook，解决 Fast Refresh 问题

### 3. 面包屑导航优化 ✅
- **新增文件**: `src/router/breadcrumb.ts`
- **优化内容**:
  - 支持动态配置的面包屑
  - 提供面包屑工具函数
  - 支持面包屑层级深度和父级路径获取
  - 优化面包屑项类型定义

### 4. 路由工具函数增强 ✅
- **优化文件**: `src/router/utils.ts`
- **优化内容**:
  - 新增 `buildFullUrl` 函数支持查询参数和 hash
  - 新增 `RouteCache` 类管理路由缓存
  - 新增 `RoutePreloader` 类管理路由预加载
  - 新增 `RouteHistory` 类管理路由历史
  - 提供全局实例 `routeCache` 和 `routeHistory`

### 5. 路由类型定义优化 ✅
- **优化文件**: `src/router/types.ts`
- **优化内容**:
  - 扩展 `RouteMeta` 接口，支持更多元信息
  - 优化 `ExtendedRouteObject` 类型定义
  - 新增 `RouteGroupConfig`、`RouteCacheItem` 等类型
  - 新增 `PermissionCheckResult` 类型

### 6. 路由缓存和预加载机制 ✅
- **实现内容**:
  - 路由组件缓存管理
  - 路由预加载配置
  - 路由历史记录管理
  - 支持 keepAlive 功能

### 7. 路由 Hooks 优化 ✅
- **优化文件**: `src/router/hooks.ts`
- **优化内容**:
  - 增强 `useRouter` Hook，支持查询参数和 hash
  - 新增路由历史管理功能
  - 优化路由导航方法
  - 支持活跃路由检查

## 新增功能

### 权限控制
```typescript
// 使用权限守卫
<Guard config={{ requiresAuth: true, roles: ['admin'], permissions: ['user:read'] }}>
  <YourComponent />
</Guard>

// 使用权限检查 Hook
const { checkPermission } = usePermissionCheck()
const result = checkPermission({ requiresAuth: true, roles: ['admin'] })
```

### 路由缓存
```typescript
// 缓存路由组件
routeCache.set('/dashboard', DashboardComponent, true)

// 获取缓存的路由
const cached = routeCache.get('/dashboard')
```

### 路由预加载
```typescript
// 预加载路由
const preloader = new RoutePreloader({
  paths: ['/dashboard', '/form'],
  delay: 100,
  priority: 'high'
})
await preloader.preloadRoutes()
```

### 增强的导航
```typescript
const { goTo, goToWithQuery, goToWithHash } = useRouter()

// 带查询参数的导航
goToWithQuery('/dashboard', { tab: 'analysis', filter: 'month' })

// 带 hash 的导航
goToWithHash('/form', 'step-2')
```

## 文件结构

```
src/router/
├── config.ts              # 路由配置和常量
├── Router.tsx             # 主路由组件
├── guards.tsx             # 路由守卫组件
├── guards-utils.ts        # 守卫工具函数
├── guards-hooks.ts        # 守卫相关 Hooks
├── hooks.ts               # 路由 Hooks
├── breadcrumb.ts          # 面包屑导航
├── types.ts               # 类型定义
├── utils.ts               # 工具函数
├── router-utils.ts        # 路由工具函数
├── index.ts               # 统一导出
└── OPTIMIZATION_SUMMARY.md # 优化总结
```

## 使用示例

### 基本路由配置
```typescript
import { ROUTES, routeConfig } from '@/router'

// 使用路由常量
navigate(ROUTES.DASHBOARD.ANALYSIS)

// 访问路由配置
const dashboardRoutes = routeConfig[0].children
```

### 权限控制
```typescript
import { Guard, usePermissionCheck } from '@/router'

// 组件级权限控制
<Guard config={{ requiresAuth: true, roles: ['admin'] }}>
  <AdminPanel />
</Guard>

// Hook 级权限检查
const { checkPermission } = usePermissionCheck()
const canAccess = checkPermission({ permissions: ['user:write'] })
```

### 面包屑导航
```typescript
import { useBreadcrumbNew, breadcrumbUtils } from '@/router'

// 使用面包屑 Hook
const { breadcrumbItems, currentBreadcrumb } = useBreadcrumbNew()

// 使用面包屑工具函数
const config = breadcrumbUtils.getBreadcrumbConfig('/dashboard/analysis')
```

## 性能优化

1. **懒加载**: 所有路由组件都支持懒加载
2. **缓存机制**: 支持路由组件缓存，避免重复渲染
3. **预加载**: 支持路由预加载，提升用户体验
4. **类型安全**: 完整的 TypeScript 类型支持
5. **模块化**: 清晰的模块分离，便于维护和扩展

## 兼容性

- 保持与现有代码的完全兼容
- 渐进式升级，可以逐步使用新功能
- 向后兼容的 API 设计
