import { format } from 'd3-format';
import { Echarts } from '../Echarts';
import type { ECOption } from '@/plugins';

export type RingProgressProps = {
    percent: number;
    height?: number;
}

const RingProgress = (props: RingProgressProps) => {
    const { percent } = props;
    const option: ECOption = {
        grid: {
            top: 0,
            bottom: 0,
        },
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 8
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 8
                    }
                },
                min: 0,
                max: 1,
                splitLine: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 18,
                    fontWeight: 'bolder',
                    offsetCenter: [0, 0],
                    formatter: (value: number) => format(".0%")(value)
                },
                data: [
                    {
                        value: percent
                    }
                ]
            }
        ]
    };


    return (
        <Echarts style={{ height: props.height || 300 }} option={option} />
    );

};

export default RingProgress;
