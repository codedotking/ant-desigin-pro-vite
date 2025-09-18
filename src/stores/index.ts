/**
 * 全局状态管理统一导出
 * 
 * @fileoverview
 * 统一导出所有状态管理相关的 Hook 和工具函数
 * 提供清晰的 API 接口，便于在组件中使用
 * 
 * @author Ant Design Pro Vite
 * @version 1.0.0
 * @since 2024
 */

// 应用设置相关
export {
    useAppSettings,
    useAppSettingsActions,
    useAppSetting,
    getCurrentAppSettings,
} from './appSettings';

// 用户相关
export {
    useUser,
    useIsLoggedIn,
    useUserActions,
    getCurrentUser,
    checkIsLoggedIn,
} from './user';

// 类型导出
export type { UserInfo } from '@/types/api';
export type { SettingsType } from '@/config/defaultSettings';