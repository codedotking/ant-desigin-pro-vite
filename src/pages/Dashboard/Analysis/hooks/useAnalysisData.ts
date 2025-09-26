import { useEffect, useState } from 'react';
import type { AnalysisData } from '../data.d';
import { fakeChartData } from '../data';

/**
 * 数据获取hook的返回类型
 */
interface UseAnalysisDataReturn {
  /** 分析数据，初始为null，获取成功后包含完整数据 */
  data: AnalysisData | null;
  /** 数据加载状态 */
  loading: boolean;
  /** 数据获取错误信息，无错误时为null */
  error: Error | null;
}

/**
 * 分析数据获取自定义hook
 * 
 * 功能：
 * - 统一管理分析数据的获取逻辑
 * - 提供loading状态和错误处理
 * - 组件挂载时自动获取数据
 * 
 * @returns {UseAnalysisDataReturn} 包含数据、加载状态和错误信息的对象
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useAnalysisData();
 * 
 * if (loading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * if (!data) return <Empty />;
 * 
 * return <AnalysisCharts data={data} />;
 * ```
 */
export const useAnalysisData = (): UseAnalysisDataReturn => {
  // 数据状态
  const [data, setData] = useState<AnalysisData | null>(null);
  // 加载状态
  const [loading, setLoading] = useState(true);
  // 错误状态
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    /**
     * 异步获取分析数据
     * 包含完整的错误处理机制
     */
    const fetchData = async () => {
      try {
        // 开始加载，清除之前的错误
        setLoading(true);
        setError(null);
        
        // 调用数据获取函数
        const result = await fakeChartData();
        setData(result);
      } catch (err) {
        // 错误处理：确保error是Error类型
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        // 无论成功失败都要结束加载状态
        setLoading(false);
      }
    };

    // 组件挂载时获取数据
    fetchData();
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return { data, loading, error };
};
