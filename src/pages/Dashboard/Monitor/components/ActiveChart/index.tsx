import { useState, useEffect, useRef } from 'react';
import { Tiny } from '@ant-design/charts';

import { Statistic } from 'antd';
import { useStyles } from './style';

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50,
    });
  }
  return activeData;
}

const ActiveChart = () => {
  const [activeData, setActiveData] = useState(getActiveData());
  const timerRef = useRef<number | undefined>(undefined);
  const requestRef = useRef<number | undefined>(undefined);

  const loopData = () => {
    requestRef.current = requestAnimationFrame(() => {
      timerRef.current = window.setTimeout(() => {
        setActiveData(getActiveData());
        loopData();
      }, 1000);
    });
  };

  useEffect(() => {
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
        <Tiny.Area autoFit data={activeData.map((item) => item.y)} height={84} />
      </div>
      {activeData && (
        <div>
          <div className={styles.activeChartGrid}>
            <p>{[...activeData].sort()[activeData.length - 1].y + 200} 亿元</p>
            <p>{[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元</p>
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
          <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
          <span>{activeData[activeData.length - 1].x}</span>
        </div>
      )}
    </div>
  );
};

export default ActiveChart;
