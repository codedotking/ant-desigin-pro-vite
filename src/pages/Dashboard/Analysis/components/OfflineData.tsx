import { Card, Col, Row, Tabs } from 'antd';
import { Pie, Line } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data.d';
import NumberInfo from './NumberInfo';
import useStyles from '../style';

const CustomTab = ({
  data,
  currentTabKey: currentKey,
}: {
  data: OfflineDataType;
  currentTabKey: string;
}) => {
  console.log(data);


  return (
    <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
      <Col span={12}>
        <NumberInfo
          title={data.name}
          subTitle="转化率"
          gap={2}
          total={`${data.cvr * 100}%`}
          theme={currentKey !== data.name ? 'light' : undefined}
        />
      </Col>
      <Col span={12} style={{ paddingTop: 36 }}>
        <Pie
          autoFit
          height={100}
          innerRadius={0.8}
          width={100}
          angleField="value"
          colorField="type"
          label={false}
          legend={false}
          data={[
            { type: data.name, value: data.cvr },
            { type: '', value: 1 - data.cvr },
          ]}
          statistic={{
            title: false,
            content: false,
          }}
        />
      </Col>
    </Row>
  );
}

const { TabPane } = Tabs;

const OfflineData = ({
  activeKey,
  loading,
  offlineData,
  offlineChartData,
  handleTabChange,
}: {
  activeKey: string;
  loading: boolean;
  offlineData: OfflineDataType[];
  offlineChartData: DataItem[];
  handleTabChange: (activeKey: string) => void;
}) => {
  const { styles } = useStyles();
  return (
    <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        {offlineData.map((shop) => (
          <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
            <div style={{ padding: '0 24px' }}>
              <Line
                {
                ...{
                  data: offlineChartData,
                  xField: 'x',
                  yField: 'y',
                  shapeField: 'smooth',
                  scale: {
                    y: {
                      domainMin: 0,
                    },
                  },
                  interaction: {
                    tooltip: {
                      marker: false,
                    },
                  },
                  style: {
                    lineWidth: 2,
                  },
                }
                }
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  )
};

export default OfflineData;
