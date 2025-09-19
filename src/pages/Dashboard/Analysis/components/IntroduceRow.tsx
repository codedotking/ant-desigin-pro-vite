import { InfoCircleOutlined } from '@ant-design/icons';
import { Tiny } from '@ant-design/plots';
import { Col, Row, Tooltip } from 'antd';
import { format } from 'd3-format';
import { ChartCard, Field } from './Charts';
import type { DataItem } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import { useStyles } from '../style';
import { useEffect } from 'react';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData = [] }: { loading: boolean; visitData: DataItem[] }) => {
  const { styles } = useStyles();

  useEffect(() => {
    console.log("visitData", visitData);
  }, [visitData]);
  const progress = 0.7

  const config = {
    height: 10,
    autoFit: true,
    percent: progress,
    // color: ["#f3cbb1", "#a0ff03"],
    // annotations: [
    //   {
    //     type: "text",
    //     style: {
    //       text: `${progress * 100}%`,
    //       x: "50%",
    //       y: "50%",
    //       textAlign: "center",
    //       fontSize: 16,
    //       fontStyle: "bold",
    //     },
    //   }
    // ]
  };

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          variant="borderless"
          title="总销售额"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => <Yuan value={126560}></Yuan>}
          footer={<Field label="日销售额" value={`￥${format(",")(12423)}`} />}
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            周同比
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            日同比
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          variant="borderless"
          loading={loading}
          title="访问量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={format(",")(8846)}
          footer={<Field label="日访问量" value={format(",")(1234)} />}
          contentHeight={46}
        >
          <Tiny.Area
            className="w-full"
            height={46}
            padding={8}
            shapeField="smooth"
            xField="index"
            yField="value"
            style={{
              fill: 'l(270) 0:rgb(151 95 228 / 10%) 0.5:rgb(151 95 228 / 60%) 1:rgb(151 95 228)',
            }}
            line={{
              color: '#975FE4',
            }}
            tooltip={true}
            data={visitData.map((item, index) => ({ value: item.y, index: index }))}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          variant="borderless"
          loading={loading}
          title="支付笔数"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }

          total={format(",")(6560)}
          footer={<Field label="转化率" value="60%" />}
          contentHeight={46}
        >
          <Tiny.Column height={46}
            autoFit
            tooltip={true}
            xField='index'
            yField='value'
            data={visitData.map((item) => ({ index: item.x, value: item.y }))} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          title="运营活动效果"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <Tiny.Progress
            height={10}
            autoFit={true}
            percent={0.78}
            tooltip={true}
            padding={[15, 100]}
            color="#13C2C2"
            annotations={[
              {
                type: "text",
                style: {
                  text: `${progress * 100}%`,
                  x: "100%",
                  y: "50%",
                  textAlign: "center",
                  fontSize: 16,
                  fontStyle: "bold",
                },
              }
            ]}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
