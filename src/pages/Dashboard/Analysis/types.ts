import type { Dayjs } from 'dayjs';

/**
 * 销售类型枚举
 * - all: 全部销售数据
 * - online: 线上销售数据
 * - stores: 门店销售数据
 */
export type SalesType = 'all' | 'online' | 'stores';

/**
 * 分析页面组件状态接口
 * 统一管理组件的所有状态，替代多个useState
 */
export interface AnalysisState {
  /** 当前选择的销售类型 */
  salesType: SalesType;
  /** 当前激活的标签页key */
  currentTabKey: string;
  /** 日期范围选择器的值 */
  rangePickerValue: [Dayjs, Dayjs];
}

/**
 * 分析页面状态更新动作类型
 * 使用联合类型定义所有可能的状态更新操作
 */
export type AnalysisAction = 
  | { type: 'SET_SALES_TYPE'; payload: SalesType }
  | { type: 'SET_TAB_KEY'; payload: string }
  | { type: 'SET_RANGE_PICKER'; payload: [Dayjs, Dayjs] };

/**
 * 下拉菜单项接口
 * 用于定义下拉菜单的选项结构
 */
export interface DropdownItem {
  /** 菜单项的唯一标识 */
  key: string;
  /** 菜单项的显示文本 */
  label: string;
}
