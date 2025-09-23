import { Card, Col, Row, Tabs } from 'antd';
import { useMemo } from 'react';
import type { OfflineDataType, DataItem } from '../data.d';
import NumberInfo from './NumberInfo';
import useStyles from '../style';
import { Echarts } from '@/components';
import type { ECOption } from '@/plugins';

/**
 * 图表配置常量
 * 统一管理 ECharts 图表的配置选项
 */
const CHART_CONFIG = {
  // 饼图配置
  pie: {
    radius: ['70%', '90%'], // 环形饼图内外半径
    avoidLabelOverlap: false, // 不避免标签重叠
    labelLine: { show: false }, // 不显示标签线
  },
  // 折线图配置
  line: {
    symbol: 'none', // 不显示数据点
    smooth: false, // 不平滑曲线
  },
  // 网格配置
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;

// 标签页样式配置
const TAB_STYLES = {
  width: 138,
  margin: '8px 0',
} as const;

// 图表容器样式配置
const CHART_STYLES = {
  height: '100px',
} as const;

// 图表内容区域内边距
const CHART_PADDING = '0 24px';

/**
 * 自定义标签页组件的属性接口
 */
interface CustomTabProps {
  data: OfflineDataType; // 离线数据类型数据
  currentTabKey: string; // 当前激活的标签页键值
}

/**
 * 自定义标签页组件
 * 显示转化率信息和环形饼图
 */
const CustomTab: React.FC<CustomTabProps> = ({ data, currentTabKey }) => {
  const isActive = currentTabKey === data.name;

  // 计算饼图数据：转化率部分和剩余部分
  const pieData = useMemo(() => [
    { name: data.name, value: data.cvr }, // 转化率部分
    { name: '', value: 1 - data.cvr }, // 剩余部分（空白显示）
  ], [data.name, data.cvr]);

  // 生成饼图配置选项
  const pieOption = useMemo(() => ({
    series: [{
      type: 'pie' as const,
      radius: CHART_CONFIG.pie.radius as [string, string],
      avoidLabelOverlap: CHART_CONFIG.pie.avoidLabelOverlap,
      labelLine: CHART_CONFIG.pie.labelLine,
      data: pieData,
    }]
  }), [pieData]);

  return (
    <Row gutter={8} style={TAB_STYLES}>
      {/* 左侧：转化率信息显示 */}
      <Col span={12}>
        <NumberInfo
          title={data.name}
          subTitle="转化率"
          gap={2}
          total={`${(data.cvr * 100).toFixed(1)}%`} // 转换为百分比并保留一位小数
          theme={!isActive ? 'light' : undefined} // 非激活状态使用浅色主题
        />
      </Col>
      {/* 右侧：环形饼图 */}
      <Col span={12}>
        <Echarts
          style={CHART_STYLES}
          option={pieOption}
        />
      </Col>
    </Row>
  );
};

/**
 * 离线数据组件属性接口
 */
interface OfflineDataProps {
  activeKey: string; // 当前激活的标签页键值
  loading: boolean; // 加载状态
  offlineData: OfflineDataType[]; // 离线数据列表
  offlineChartData: DataItem[]; // 图表数据
  handleTabChange: (activeKey: string) => void; // 标签页切换回调
}

/**
 * 离线数据组件
 * 展示不同店铺的转化率信息和趋势图表
 */
const OfflineData: React.FC<OfflineDataProps> = ({
  activeKey,
  loading,
  offlineData,
  offlineChartData,
  handleTabChange,
}) => {
  const { styles } = useStyles();

  // 数据处理和图表系列生成
  // 使用 useMemo 优化性能，避免重复计算
  const { dateList, seriesData } = useMemo(() => {
    // 1. 去重并排序日期，作为 X 轴数据
    const uniqueDates = Array.from(
      new Set(offlineChartData.map(item => item.date))
    ).sort();

    // 2. 按数据类型分组，生成折线图系列数据
    const dataByType = offlineChartData.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      // 存储为 [日期, 数值] 格式，符合 ECharts 折线图数据要求
      acc[item.type].push([item.date, item.value]);
      return acc;
    }, {} as Record<string, Array<[string, number]>>);

    // 3. 生成 ECharts 系列配置
    const series = Object.entries(dataByType).map(([type, data]) => ({
      type: 'line' as const,
      data,
      name: type,
      ...CHART_CONFIG.line, // 应用折线图配置
    }));

    return {
      dateList: uniqueDates,
      seriesData: series,
    };
  }, [offlineChartData]);

  // 生成 ECharts 折线图配置选项
  const chartOption = useMemo<ECOption>(() => ({
    grid: CHART_CONFIG.grid, // 图表网格配置
    xAxis: {
      type: 'category' as const, // 类目轴
      data: dateList, // X 轴数据（日期）
    },
    yAxis: {
      type: 'value' as const, // 数值轴
    },
    series: seriesData, // 系列数据（多条折线）
  } as ECOption), [dateList, seriesData]);

  // 生成标签页配置项
  // 每个标签页包含店铺信息和对应的趋势图表
  const tabItems = useMemo(() =>
    offlineData.map((shop) => ({
      key: shop.name, // 标签页唯一标识
      label: <CustomTab data={shop} currentTabKey={activeKey} />, // 自定义标签页内容
      children: (
        <div style={{ padding: CHART_PADDING }}>
          {/* 趋势折线图 */}
          <Echarts option={chartOption} />
        </div>
      ),
    })), [offlineData, activeKey, chartOption]
  );

  return (
    <Card
      loading={loading}
      className={styles.offlineCard}
      variant="borderless"
      style={{ marginTop: 32 }}
    >
      {/* 标签页容器：展示不同店铺的数据 */}
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        items={tabItems}
      />
    </Card>
  );
};

export default OfflineData;
