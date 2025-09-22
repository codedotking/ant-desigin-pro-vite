import { Pie, type Chart, type PieConfig } from '@ant-design/charts';
import type { PropsWithoutRef, RefAttributes } from 'react';

export type RingProgressProps = PropsWithoutRef<PieConfig> & RefAttributes<Chart> & {
    percent: number;
}



const RingProgress = (props: RingProgressProps) => {
    const { percent, ...rest } = props;
    const data = [
        { type: 'progress', value: props.percent },
        { type: 'remaining', value: 1 - percent },
    ];

    return (
        <div className={props.className} style={props.style}>
            <Pie {...rest} data={data} />
        </div>
    );
};

export default RingProgress;
