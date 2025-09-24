import * as echarts from 'echarts/core';
import {
    GaugeChart,
    LineChart,
    BarChart,
    PieChart
} from 'echarts/charts';
import type {
    // 系列类型的定义后缀都为 SeriesOption
    GaugeSeriesOption,
    LineSeriesOption,
    BarSeriesOption,
    PieSeriesOption
} from 'echarts/charts';

import { CanvasRenderer ,SVGRenderer} from 'echarts/renderers';

import type {
    ComposeOption,
} from 'echarts/core';


import {
    GridComponent,
    TooltipComponent,
    
} from 'echarts/components';

import type {
    TooltipComponentOption,
    GridComponentOption,
} from 'echarts/components';


// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
    | GaugeSeriesOption
    | LineSeriesOption
    | BarSeriesOption
    | PieSeriesOption


    | TooltipComponentOption
    | GridComponentOption
>;

// 注册必须的组件
echarts.use([
    SVGRenderer,
    CanvasRenderer,
    GridComponent,
    TooltipComponent,

    LineChart,
    BarChart,
    GaugeChart,
    PieChart
]);


export default echarts;