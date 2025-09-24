import { Echarts } from "@/components";
import type { ECOption } from "@/plugins";
import { format } from "d3-format";

const Gauge = ({ percent, height }: {
  percent: number;
  height: number
}) => {
  const option: ECOption = {
    series: [
      {
        type: 'gauge',
        radius: '70%',
        min: 0,
        max: 1,
        startAngle: 190,
        endAngle: -10,
        splitNumber: 5,
        splitLine: {
          distance: -20,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          distance: -15,
          color: '#464646',
          rotate: 'tangential',
          formatter(value) {
            return format("0")(value * 100)
          }
        },
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.2, '#FF6E76'],
              [0.4, '#FDDD60'],
              [0.6, '#58D9F9'],
              [0.8, '#FF6E76'],
              [1, '#7CFFB2']
            ]
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 10,
          itemStyle: {
            color: '#FAC858'
          },
          offsetCenter: [0, 0]
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 4,
          length: '80%',
          offsetCenter: [0, 0]
        },
        detail: {
          fontSize: 20,
          offsetCenter: [0, '40%'],
          valueAnimation: true,
          color: 'inherit',
          formatter(value: number) {
            // 划分五档
            if (value >= 0.8) {
              return '优';
            } else if (value >= 0.6) {
              return '良';
            } else if (value >= 0.4) {
              return '中';
            } else if (value >= 0.2) {
              return '差';
            } else {
              return '极差';
            }
          },
        },
        data: [
          {
            value: percent,
          }
        ]
      }
    ]
  }
  return <Echarts style={{ height: height || 300, width: '100%' }} option={option} />

}

export default Gauge