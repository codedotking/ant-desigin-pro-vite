import { Suspense, useCallback, useMemo, useReducer } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import PageLoading from './components/PageLoading';
import AnalysisContent from './components/AnalysisContent';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import { useStyles } from './style';
import { useAnalysisData, useSalesType } from './hooks';
import { DROPDOWN_ITEMS } from './constants';
import type { AnalysisState, AnalysisAction } from './types';
import type { Dayjs } from 'dayjs';

/**
 * 分析页面的初始状态
 * - salesType: 销售类型筛选，默认为'all'
 * - currentTabKey: 当前选中的标签页key
 * - rangePickerValue: 日期范围选择器的值，默认为当前年份
 */
const initialState: AnalysisState = {
  salesType: 'all',
  currentTabKey: '',
  rangePickerValue: getTimeDistance('year'),
};

/**
 * 分析页面状态管理的reducer函数
 * 统一管理组件的状态更新逻辑，提高状态管理的可预测性
 * @param state 当前状态
 * @param action 状态更新动作
 * @returns 新的状态对象
 */
const analysisReducer = (state: AnalysisState, action: AnalysisAction): AnalysisState => {
  switch (action.type) {
    case 'SET_SALES_TYPE':
      return { ...state, salesType: action.payload };
    case 'SET_TAB_KEY':
      return { ...state, currentTabKey: action.payload };
    case 'SET_RANGE_PICKER':
      return { ...state, rangePickerValue: action.payload };
    default:
      return state;
  }
};


/**
 * 分析页面主组件
 * 负责数据展示页面的整体布局和状态管理
 * 使用useReducer管理复杂状态，自定义hooks处理业务逻辑
 */
const Analysis = () => {
  const { styles } = useStyles();

  // 使用useReducer管理组件状态，替代多个useState
  const [state, dispatch] = useReducer(analysisReducer, initialState);

  // 自定义hook：获取分析数据，包含loading和error状态
  const { data, loading } = useAnalysisData();

  // 自定义hook：根据销售类型计算饼图数据
  const { salesPieData } = useSalesType({ salesType: state.salesType, data });

  /**
   * 处理日期选择器快速选择（今日、本周、本月、本年等）
   * 使用useCallback优化性能，避免不必要的重新渲染
   */
  const selectDate = useCallback((type: TimeType) => {
    dispatch({ type: 'SET_RANGE_PICKER', payload: getTimeDistance(type) });
  }, []);

  /**
   * 处理日期范围选择器变化
   * 用户手动选择日期范围时触发
   */
  const handleRangePickerChange = useCallback((value: [Dayjs, Dayjs]) => {
    dispatch({ type: 'SET_RANGE_PICKER', payload: value });
  }, []);

  /**
   * 处理销售类型切换（全部/线上/门店）
   * 影响饼图数据的显示
   */
  const handleChangeSalesType = useCallback((e: RadioChangeEvent) => {
    dispatch({ type: 'SET_SALES_TYPE', payload: e.target.value });
  }, []);

  /**
   * 处理离线数据标签页切换
   * 影响离线数据图表的显示内容
   */
  const handleTabChange = useCallback((key: string) => {
    dispatch({ type: 'SET_TAB_KEY', payload: key });
  }, []);

  /**
   * 下拉菜单组件
   * 使用useMemo缓存，避免每次渲染都重新创建
   */
  const dropdownGroup = useMemo(() => (
    <span className={styles.iconGroup}>
      <Dropdown menu={{ items: [...DROPDOWN_ITEMS] }} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  ), [styles.iconGroup]);

  /**
   * 计算当前激活的标签页key
   * 优先使用用户选择的标签页，否则使用第一个离线数据项
   */
  const activeKey = useMemo(() =>
    state.currentTabKey || data?.offlineData?.[0]?.name || '',
    [state.currentTabKey, data?.offlineData]
  );

  return (
    <Suspense fallback={<PageLoading />}>
      <AnalysisContent
        data={data}
        loading={loading}
        salesType={state.salesType}
        rangePickerValue={state.rangePickerValue}
        salesPieData={salesPieData}
        activeKey={activeKey}
        dropdownGroup={dropdownGroup}
        selectDate={selectDate}
        handleRangePickerChange={handleRangePickerChange}
        handleChangeSalesType={handleChangeSalesType}
        handleTabChange={handleTabChange}
      />
    </Suspense>
  );
};

export default Analysis