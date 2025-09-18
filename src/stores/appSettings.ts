/**
 * 应用设置状态管理 Store
 * 
 * @fileoverview
 * 基于 Zustand + Immer + Persist 的应用设置状态管理
 * 负责管理应用的主题、布局、颜色等全局配置
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

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Settings, { type SettingsType } from "@/config/defaultSettings";

/**
 * 应用设置状态接口
 */
interface AppSettingsState {
    /** 应用设置配置 */
    settings: SettingsType;
}

/**
 * 应用设置操作方法接口
 */
interface AppSettingsActions {
    /** 批量更新设置 */
    updateSettings: (newSettings: Partial<SettingsType>) => void;
    /** 重置所有设置为默认值 */
    resetSettings: () => void;
    /** 更新单个设置项 */
    updateSetting: <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => void;
}

/**
 * 应用设置 Store 接口
 */
interface AppSettingsStore extends AppSettingsState {
    /** 状态操作方法 */
    actions: AppSettingsActions;
}

/**
 * 持久化状态类型定义
 */
type PersistedAppSettingsState = {
    settings: SettingsType;
};

/**
 * 创建应用设置状态 Store
 */
const useAppSettingsStore = create<AppSettingsStore, [["zustand/persist", PersistedAppSettingsState], ["zustand/immer", never]]>(
    persist(
        immer((set) => ({
            // 初始状态：使用默认设置
            settings: Settings,

            // 状态操作方法
            actions: {
                /**
                 * 批量更新设置
                 * @param newSettings - 要更新的设置对象（部分更新）
                 */
                updateSettings: (newSettings) => {
                    try {
                        if (!newSettings || typeof newSettings !== 'object') {
                            console.warn('updateSettings: Invalid settings object provided');
                            return;
                        }

                        set((state) => {
                            Object.assign(state.settings, newSettings);
                        });
                    } catch (error) {
                        console.error('Error updating settings:', error);
                    }
                },

                /**
                 * 重置所有设置为默认值
                 */
                resetSettings: () => {
                    try {
                        set((state) => {
                            Object.assign(state.settings, Settings);
                        });
                    } catch (error) {
                        console.error('Error resetting settings:', error);
                    }
                },

                /**
                 * 更新单个设置项
                 * @param key - 设置项的键名
                 * @param value - 设置项的新值
                 */
                updateSetting: (key, value) => {
                    try {
                        if (key === undefined || value === undefined) {
                            console.warn('updateSetting: Key or value is undefined');
                            return;
                        }

                        set((state) => {
                            state.settings[key] = value;
                        });
                    } catch (error) {
                        console.error('Error updating setting:', error);
                    }
                },
            },
        })),
        {
            name: 'app-settings',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ settings: state.settings }),
        }
    )
);

// ==================== 导出的 Hook 和工具函数 ====================

/**
 * 获取应用设置状态
 * @returns 当前的应用设置对象
 * @description 响应式 Hook，当设置发生变化时会触发组件重新渲染
 * 
 * @example
 * ```tsx
 * const settings = useAppSettings();
 * console.log(settings.title); // "Ant Design Pro"
 * ```
 */
export const useAppSettings = () => useAppSettingsStore((state) => state.settings);

/**
 * 获取应用设置操作方法
 * @returns 包含所有设置操作方法的对象
 * @description 非响应式 Hook，用于获取操作方法，不会触发重新渲染
 * 
 * @example
 * ```tsx
 * const { updateSettings, resetSettings, updateSetting } = useAppSettingsActions();
 * updateSettings({ title: '新标题' });
 * ```
 */
export const useAppSettingsActions = () => useAppSettingsStore((state) => state.actions);

/**
 * 获取单个设置项
 * @param key - 设置项的键名
 * @returns 指定设置项的值
 * @description 类型安全的单属性选择器，提供更好的性能优化
 * 
 * @example
 * ```tsx
 * const title = useAppSetting('title');
 * const colorPrimary = useAppSetting('colorPrimary');
 * ```
 */
export const useAppSetting = <K extends keyof SettingsType>(key: K) =>
    useAppSettingsStore((state) => state.settings[key]);

/**
 * 获取当前设置的快照（非响应式）
 * @returns 当前设置的完整对象
 * @description 用于在非 React 组件中获取设置，或在事件处理函数中使用
 * 
 * @example
 * ```tsx
 * const handleClick = () => {
 *   const currentSettings = getCurrentAppSettings();
 *   console.log('当前主题:', currentSettings.navTheme);
 * };
 * ```
 */
export const getCurrentAppSettings = () => useAppSettingsStore.getState().settings;
