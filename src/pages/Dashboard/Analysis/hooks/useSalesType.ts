import { useMemo } from 'react';
import type { AnalysisData } from '../data.d';
import type { DataItem } from '../data.d';
import type { SalesType } from '../types';

/**
 * 销售类型hook的输入参数类型
 */
interface UseSalesTypeProps {
  /** 当前选择的销售类型 */
  salesType: SalesType;
  /** 分析数据，可能为null */
  data: AnalysisData | null;
}

/**
 * 销售类型hook的返回类型
 */
interface UseSalesTypeReturn {
  /** 根据销售类型筛选后的饼图数据 */
  salesPieData: DataItem[];
}

/**
 * 销售类型数据处理自定义hook
 * 
 * 功能：
 * - 根据销售类型筛选对应的饼图数据
 * - 使用useMemo优化性能，避免不必要的重新计算
 * - 提供类型安全的数据筛选逻辑
 * 
 * @param props - 包含销售类型和数据的参数对象
 * @returns {UseSalesTypeReturn} 包含筛选后饼图数据的对象
 * 
 * @example
 * ```tsx
 * const { salesPieData } = useSalesType({ 
 *   salesType: 'online', 
 *   data: analysisData 
 * });
 * 
 * return <PieChart data={salesPieData} />;
 * ```
 */
export const useSalesType = ({ salesType, data }: UseSalesTypeProps): UseSalesTypeReturn => {
  /**
   * 根据销售类型计算饼图数据
   * 使用useMemo缓存计算结果，只有当salesType或data变化时才重新计算
   */
  const salesPieData = useMemo(() => {
    // 数据为空时返回空数组
    if (!data) return [];

    // 根据销售类型返回对应的数据
    switch (salesType) {
      case 'online':
        // 线上销售数据
        return data.salesTypeDataOnline || [];
      case 'stores':
        // 门店销售数据
        return data.salesTypeDataOffline || [];
      case 'all':
      default:
        // 全部销售数据（默认）
        return data.salesTypeData || [];
    }
  }, [salesType, data]); // 依赖数组：当销售类型或数据变化时重新计算

  return { salesPieData };
};
