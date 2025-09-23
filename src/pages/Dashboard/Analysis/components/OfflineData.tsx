import { Card, Col, Row, Tabs } from 'antd';
import type { OfflineDataType, DataItem } from '../data.d';
import NumberInfo from './NumberInfo';
import useStyles from '../style';
import { Echarts } from '@/components';

const CustomTab = ({
  data,
  currentTabKey: currentKey,
}: {
  data: OfflineDataType;
  currentTabKey: string;
}) => {
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
      <Col span={12} style={{}}>
        <Echarts
          style={{ height: '100px' }}
          option={{
            series: [
              {
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                labelLine: {
                  show: false,
                },
                data: [
                  { name: data.name, value: data.cvr },
                  { name: '', value: 1 - data.cvr },
                ]
              }
            ]
          }} />
      </Col>
    </Row>
  );
}

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


  // 去重
  const dateList: string[] = []
  const dateSet = new Set<string>(offlineChartData.map(item => item.date))
  dateSet.forEach(item => {
    dateList.push(item)
  })


  return (
    <Card loading={loading} className={styles.offlineCard} variant='borderless' style={{ marginTop: 32 }}>
      <Tabs activeKey={activeKey} onChange={handleTabChange}

        items={offlineData.map((shop) => ({
          key: shop.name,
          label: <CustomTab data={shop} currentTabKey={activeKey} />,
          children: <div style={{ padding: '0 24px' }}>
            <Echarts option={{
              grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              xAxis: {
                type: "category",
                data: dateList
              },
              yAxis: {
                type: "value"
              },
              series: offlineChartData.map(item => {
                const data = offlineChartData.filter(item_ => item.type == item_.type)
                  .map(item => ({ name: item.date, value: item.value }))
                console.log(data);
                return {
                  type: "line",
                  data: data,
                  symbol: "none",
                  smooth: false,
                  name: item.type
                }
              })
            }}>
            </Echarts>
          </div>,
        }))}

      >
      </Tabs>
    </Card>
  )
};

export default OfflineData;
