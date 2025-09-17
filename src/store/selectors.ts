import type { StoreApi, UseBoundStore } from "zustand";

type State = object;

/**
 * 为 Zustand store 添加选择器功能的类型定义
 * 将原始 store 类型扩展，添加 use 属性，其中包含每个状态字段的独立选择器函数
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

/**
 * 创建带有选择器的 Zustand store
 * 为 store 中的每个状态字段自动生成对应的选择器函数
 * 
 * @param _store - 原始的 Zustand store 实例
 * @returns 扩展后的 store，包含 use 属性，提供独立的状态选择器
 * 
 * @example
 * const useStore = createSelectors(create(...))
 * // 现在可以使用：
 * const count = useStore.use.count()
 * const user = useStore.use.user()
 */
const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(
  _store: S
) => {
  // 将原始 store 类型断言为带有选择器的类型
  const store = _store as WithSelectors<typeof _store>;
  
  // 初始化 use 对象
  store.use = {};
  
  // 遍历 store 中的所有状态字段，为每个字段创建对应的选择器函数
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, () => unknown>)[k] = () => store((s) => s[k as keyof typeof s]);
  }
  
  return store;
};

export default createSelectors;
