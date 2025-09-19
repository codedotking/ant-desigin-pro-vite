import type { AnalysisData } from './data.d';

// 模拟数据
const mockAnalysisData: AnalysisData = {
  visitData: [
    { x: '2023-01', y: 100 },
    { x: '2023-02', y: 120 },
    { x: '2023-03', y: 110 },
    { x: '2023-04', y: 130 },
    { x: '2023-05', y: 140 },
    { x: '2023-06', y: 150 },
  ],
  visitData2: [
    { x: '2023-01', y: 80 },
    { x: '2023-02', y: 90 },
    { x: '2023-03', y: 85 },
    { x: '2023-04', y: 95 },
    { x: '2023-05', y: 100 },
    { x: '2023-06', y: 105 },
  ],
  salesData: [
    { x: '2023-01', y: 200 },
    { x: '2023-02', y: 220 },
    { x: '2023-03', y: 210 },
    { x: '2023-04', y: 230 },
    { x: '2023-05', y: 240 },
    { x: '2023-06', y: 250 },
  ],
  searchData: [
    { x: '2023-01', y: 50 },
    { x: '2023-02', y: 60 },
    { x: '2023-03', y: 55 },
    { x: '2023-04', y: 65 },
    { x: '2023-05', y: 70 },
    { x: '2023-06', y: 75 },
  ],
  offlineData: [
    { name: '门店1', cvr: 0.8 },
    { name: '门店2', cvr: 0.7 },
    { name: '门店3', cvr: 0.9 },
  ],
  offlineChartData: [
    { x: '2023-01', y: 30 },
    { x: '2023-02', y: 35 },
    { x: '2023-03', y: 32 },
    { x: '2023-04', y: 38 },
    { x: '2023-05', y: 40 },
    { x: '2023-06', y: 42 },
  ],
  salesTypeData: [
    { x: '线上', y: 60 },
    { x: '线下', y: 40 },
  ],
  salesTypeDataOnline: [
    { x: '线上', y: 60 },
  ],
  salesTypeDataOffline: [
    { x: '线下', y: 40 },
  ],
  radarData: [
    { name: '个人', label: '个人', value: 70 },
    { name: '团队', label: '团队', value: 60 },
    { name: '部门', label: '部门', value: 50 },
    { name: '公司', label: '公司', value: 40 },
  ],
};

export const fakeChartData = async (): Promise<AnalysisData> => {
  // 模拟异步请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalysisData);
    }, 1000);
  });
};
