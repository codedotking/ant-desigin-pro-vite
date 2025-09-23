import { Echarts } from "@/components/ECharts";
import type { ECOption } from "@/plugins";


export interface ColumnItem {
    name: string;
    value: number | string;
}

interface TinyColumnProps {
    height?: number;
    padding?: number;
    data: ColumnItem[];
}

export const Column: React.FC<TinyColumnProps> = (props) => {
    const { height, data, padding = 0 } = props;

    const xAxis = data.map(item => item.name)
    const yAxis = data.map(item => Number(item.value))
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
        grid: {
            left: padding,
            right: padding,
            top: padding,
            bottom: padding,
        },
        xAxis: {
            type: 'category',
            data: xAxis,
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                data: yAxis,
                type: 'bar',
                itemStyle: {
                    color: '#1890FF'
                }
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