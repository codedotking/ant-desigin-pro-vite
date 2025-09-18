/**
 * 用户状态管理 Store
 * 
 * @fileoverview
 * 基于 Zustand + Immer + Persist 的用户状态管理
 * 负责管理用户信息、登录状态等用户相关数据
 * 
 * @features
 * - 🚀 高性能：使用 Zustand 轻量级状态管理
 * - 🔒 类型安全：完整的 TypeScript 类型支持
 * - 💾 持久化：自动保存到 localStorage
 * - 🔄 不可变更新：使用 Immer 简化状态操作
 * - ⚡ 性能优化：细粒度选择器，避免不必要的重新渲染
 * 
 * @author Ant Design Pro Vite
 * @version 1.0.0
 * @since 2024
 */

import type { UserInfo } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * 用户状态接口
 */
interface UserState {
    /** 用户信息 */
    user: Partial<UserInfo>;
    /** 登录状态 */
    isLoggedIn: boolean;
}

/**
 * 用户操作方法接口
 */
interface UserActions {
    /** 设置用户信息 */
    setUser: (user: Partial<UserInfo>) => void;
    /** 清除用户信息 */
    clearUser: () => void;
    /** 更新用户信息 */
    updateUser: (updates: Partial<UserInfo>) => void;
}

/**
 * 用户 Store 接口
 */
interface UserStore extends UserState {
    /** 状态操作方法 */
    actions: UserActions;
}

/**
 * 持久化状态类型定义
 */
type PersistedUserState = {
    user: Partial<UserInfo>;
    isLoggedIn: boolean;
};

/**
 * 创建用户状态 Store
 */
const useUserStore = create<UserStore, [["zustand/persist", PersistedUserState], ["zustand/immer", never]]>(
    persist(
        immer((set) => ({
            // 初始状态
            user: {},
            isLoggedIn: false,

            // 状态操作方法
            actions: {
                /**
                 * 设置用户信息
                 * @param user - 用户信息对象
                 */
                setUser: (user) => {
                    try {
                        if (!user || typeof user !== 'object') {
                            console.warn('setUser: Invalid user object provided');
                            return;
                        }

                        set((state) => {
                            state.user = user;
                            state.isLoggedIn = true;
                        });
                    } catch (error) {
                        console.error('Error setting user:', error);
                    }
                },

                /**
                 * 清除用户信息
                 */
                clearUser: () => {
                    try {
                        set((state) => {
                            state.user = {};
                            state.isLoggedIn = false;
                        });
                    } catch (error) {
                        console.error('Error clearing user:', error);
                    }
                },

                /**
                 * 更新用户信息
                 * @param updates - 要更新的用户信息
                 */
                updateUser: (updates) => {
                    try {
                        if (!updates || typeof updates !== 'object') {
                            console.warn('updateUser: Invalid updates object provided');
                            return;
                        }

                        set((state) => {
                            Object.assign(state.user, updates);
                        });
                    } catch (error) {
                        console.error('Error updating user:', error);
                    }
                },
            },
        })),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ 
                user: state.user, 
                isLoggedIn: state.isLoggedIn 
            }),
        }
    )
);

// ==================== 导出的 Hook 和工具函数 ====================

/**
 * 获取用户信息
 * @returns 当前用户信息对象
 * @description 响应式 Hook，当用户信息发生变化时会触发组件重新渲染
 * 
 * @example
 * ```tsx
 * const user = useUser();
 * console.log(user.name); // "用户名"
 * ```
 */
export const useUser = () => useUserStore((state) => state.user);

/**
 * 获取用户登录状态
 * @returns 当前登录状态
 * @description 响应式 Hook，当登录状态发生变化时会触发组件重新渲染
 * 
 * @example
 * ```tsx
 * const isLoggedIn = useIsLoggedIn();
 * if (isLoggedIn) {
 *   // 用户已登录
 * }
 * ```
 */
export const useIsLoggedIn = () => useUserStore((state) => state.isLoggedIn);

/**
 * 获取用户操作方法
 * @returns 包含所有用户操作方法的对象
 * @description 非响应式 Hook，用于获取操作方法，不会触发重新渲染
 * 
 * @example
 * ```tsx
 * const { setUser, clearUser, updateUser } = useUserActions();
 * setUser({ name: '新用户' });
 * ```
 */
export const useUserActions = () => useUserStore((state) => state.actions);

/**
 * 获取当前用户信息快照（非响应式）
 * @returns 当前用户信息对象
 * @description 用于在非 React 组件中获取用户信息，或在事件处理函数中使用
 * 
 * @example
 * ```tsx
 * const handleClick = () => {
 *   const currentUser = getCurrentUser();
 *   console.log('当前用户:', currentUser.name);
 * };
 * ```
 */
export const getCurrentUser = () => useUserStore.getState().user;

/**
 * 检查用户是否已登录（非响应式）
 * @returns 登录状态
 * @description 用于在非 React 组件中检查登录状态
 * 
 * @example
 * ```tsx
 * const handleClick = () => {
 *   if (checkIsLoggedIn()) {
 *     // 用户已登录
 *   }
 * };
 * ```
 */
export const checkIsLoggedIn = () => useUserStore.getState().isLoggedIn;
