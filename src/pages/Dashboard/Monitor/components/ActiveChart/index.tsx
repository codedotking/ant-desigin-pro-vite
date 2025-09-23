import { useState, useEffect, useRef } from 'react';

import { Statistic } from 'antd';
import { useStyles } from './style';
import { Tiny } from '@/components';

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      name: `${fixedZero(i)}:00`,
      value: Math.floor(Math.random() * 200) + i * 50,
    });
  }
  return activeData;
}

const ActiveChart = () => {
  const [activeData, setActiveData] = useState(getActiveData());
  const timerRef = useRef<number | undefined>(undefined);
  const requestRef = useRef<number | undefined>(undefined);



  useEffect(() => {

    console.log([...activeData].sort());
    
    const loopData = () => {
      requestRef.current = requestAnimationFrame(() => {
        timerRef.current = window.setTimeout(() => {
          setActiveData(getActiveData());
          loopData();
        }, 1000);
      });
    };
    loopData();

    return () => {
      clearTimeout(timerRef.current);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const { styles } = useStyles();

  return (
    <div className={styles.activeChart}>
      <Statistic title="目标评估" value="有望达到预期" />


      <div style={{ marginTop: 32 }}>
        <Tiny.Area height={84} data={activeData} />
      </div>

      {activeData && (
        <div>
          <div className={styles.activeChartGrid}>
            <p>{[...activeData].sort()[activeData.length - 1].value + 200} 亿元</p>
            <p>{[...activeData].sort()[Math.floor(activeData.length / 2)].value} 亿元</p>
          </div>
          <div className={styles.dashedLine}>
            <div className={styles.line} />
          </div>
          <div className={styles.dashedLine}>
            <div className={styles.line} />
          </div>
        </div>
      )}
      {activeData && (
        <div className={styles.activeChartLegend}>
          <span>00:00</span>
          <span>{activeData[Math.floor(activeData.length / 2)].name}</span>
          <span>{activeData[activeData.length - 1].name}</span>
        </div>
      )}
    </div>
  );
};

export default ActiveChart;
