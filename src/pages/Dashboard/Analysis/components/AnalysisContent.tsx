import { memo } from 'react';
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import type { AnalysisData } from '../data.d';
import type { SalesType } from '../types';
import type { TimeType } from './SalesCard';
import type { Dayjs } from 'dayjs';
import IntroduceRow from './IntroduceRow';
import SalesCard from './SalesCard';
import TopSearch from './TopSearch';
import ProportionSales from './ProportionSales';
import OfflineData from './OfflineData';
import PageLoading from './PageLoading';
import { GRID_GUTTER, ROW_MARGIN_TOP } from '../constants';

/**
 * 分析内容组件的属性接口
 * 定义传递给AnalysisContent组件的所有属性
 */
interface AnalysisContentProps {
  /** 分析数据，可能为null */
  data: AnalysisData | null;
  /** 数据加载状态 */
  loading: boolean;
  /** 当前选择的销售类型 */
  salesType: SalesType;
  /** 日期范围选择器的值 */
  rangePickerValue: [Dayjs, Dayjs];
  /** 饼图数据数组 */
  salesPieData: any[];
  /** 当前激活的标签页key */
  activeKey: string;
  /** 下拉菜单组件 */
  dropdownGroup: React.ReactNode;
  /** 日期快速选择处理函数 */
  selectDate: (type: TimeType) => void;
  /** 日期范围变化处理函数 */
  handleRangePickerChange: (value: [Dayjs, Dayjs]) => void;
  /** 销售类型变化处理函数 */
  handleChangeSalesType: (e: any) => void;
  /** 标签页切换处理函数 */
  handleTabChange: (key: string) => void;
}

/**
 * 分析内容展示组件
 * 
 * 功能：
 * - 负责分析页面的内容布局和渲染
 * - 使用memo优化性能，避免不必要的重新渲染
 * - 将复杂的布局逻辑从主组件中分离出来
 * 
 * 组件结构：
 * - IntroduceRow: 数据概览行
 * - SalesCard: 销售数据卡片
 * - TopSearch: 热门搜索组件
 * - ProportionSales: 销售比例组件
 * - OfflineData: 离线数据组件
 */
const AnalysisContent = memo<AnalysisContentProps>(({
  data,
  loading,
  salesType,
  rangePickerValue,
  salesPieData,
  activeKey,
  dropdownGroup,
  selectDate,
  handleRangePickerChange,
  handleChangeSalesType,
  handleTabChange,
}) => {
  return (
    <GridContent>
      {/* 数据概览行 - 显示关键指标 */}
      <IntroduceRow loading={loading} visitData={data?.visitData || []} />

      {/* 销售数据卡片 - 包含销售趋势图表和日期选择器 */}
      <SalesCard
        rangePickerValue={rangePickerValue}
        salesData={data?.salesData || []}
        handleRangePickerChange={handleRangePickerChange}
        loading={loading}
        selectDate={selectDate}
      />

      {/* 两列布局：热门搜索和销售比例 */}
      <Row gutter={GRID_GUTTER} style={{ marginTop: ROW_MARGIN_TOP }}>
        {/* 左侧：热门搜索组件 */}
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TopSearch
            loading={loading}
            visitData2={data?.visitData2}
            searchData={data?.searchData}
            dropdownGroup={dropdownGroup}
          />
        </Col>
        {/* 右侧：销售比例饼图组件 */}
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <ProportionSales
            dropdownGroup={dropdownGroup}
            salesType={salesType}
            loading={loading}
            salesPieData={salesPieData}
            handleChangeSalesType={handleChangeSalesType}
          />
        </Col>
      </Row>

      {/* 离线数据组件 - 显示门店相关数据 */}
      <OfflineData
        activeKey={activeKey}
        loading={loading}
        offlineData={data?.offlineData || []}
        offlineChartData={data?.offlineChartData || []}
        handleTabChange={handleTabChange}
      />
    </GridContent>
  );
});

// 设置组件显示名称，便于调试
AnalysisContent.displayName = 'AnalysisContent';

export default AnalysisContent;
