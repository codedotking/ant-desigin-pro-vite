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
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    valueAnimation: false,
                    fontSize: 12,
                    offsetCenter: [0, '70%'],
                    formatter: (value: number) => format(".0%")(value)
                },
                data: [
                    {
                        value: percent * 100
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
