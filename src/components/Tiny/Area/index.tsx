import { Echarts } from "@/components/ECharts";
import type { ECOption } from "@/plugins";


export interface AreaItem {
    name: string;
    value: number;
}

export const Area: React.FC<{ height?: number, data: AreaItem[] }> = (props) => {
    const { height, data } = props;

    const xAxis = data.map(item => item.name)
    const yAxis = data.map(item => item.value)
    const option: ECOption = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis,
                show: false,
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
            }
        ],
        series: [
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                showSymbol: false,
                lineStyle: {
                    color: 'transparent'
                },
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#1089ff' },
                            { offset: 1, color: 'rgba(24, 144, 255, 0.2)' },
                        ]
                    }
                },
                data: yAxis
            }
        ]
    };

    return (
        <div style={{ height: height || 300 }}>
            <Echarts
                option={option}
                style={{ height: '100%' }}
            />
        </div>
    );
};
