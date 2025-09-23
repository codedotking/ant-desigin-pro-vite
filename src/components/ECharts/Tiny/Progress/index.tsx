import { Echarts } from "@/components/ECharts";
import type { ECOption } from "@/plugins";
import { format } from "d3-format";

export interface ProgressItem {
    name: string;
    value: number | string;
}

interface TinyProgressProps {
    height?: number;
    padding?: number;
    percentage?: number;
}

export const Progress: React.FC<TinyProgressProps> = (props) => {
    const { height, padding = 0, percentage = 1 } = props;

    const option: ECOption = {
        grid: {
            left: padding,
            right: padding,
            top: 'center',
        },
        xAxis: {
            show: false,
            max: percentage > 1 ? 100 : 1,
        },
        yAxis: {
            data: ['1'],
            inverse: true,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            }
        },
        series: [
            {
                type: 'bar',
                cursor: 'default',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(0,0,0,0.06)',
                    borderRadius: 6,
                },
                itemStyle: {
                    color: '#1890FF',
                },
                data: [percentage],
                z: 0,
                animation: false,
            },
        ]
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
        }}>
            <Echarts
                option={option}
                style={{ height: height || 300, flex: 1 }}
            />
            <span>
                {format('.0%')(percentage)}
            </span>
        </div>
    );
};