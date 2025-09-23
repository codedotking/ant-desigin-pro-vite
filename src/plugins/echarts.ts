import * as echarts from 'echarts/core';
import {
    GaugeChart,
    LineChart,
} from 'echarts/charts';
import type {
    // 系列类型的定义后缀都为 SeriesOption
    GaugeSeriesOption,
    LineSeriesOption
} from 'echarts/charts';

import { CanvasRenderer } from 'echarts/renderers';

import type {
    ComposeOption,
} from 'echarts/core';


import { GridComponent, TooltipComponent } from 'echarts/components';



// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
    | GaugeSeriesOption
    | LineSeriesOption
>;

// 注册必须的组件
echarts.use([
    GaugeChart,
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent
]);


export default echarts;