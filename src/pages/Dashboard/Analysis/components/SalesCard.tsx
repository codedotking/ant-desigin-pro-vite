import { Card, Col, DatePicker, Row, Tabs, Segmented } from 'antd';
import type { Dayjs } from 'dayjs';
import { format } from 'd3-format';
import type { DataItem } from '../data.d';
import { useStyles } from '../style';
import { isTimeRangeInPreset } from '../utils/utils';
import { Echarts } from '@/components';
import type { ECOption } from '@/plugins';

export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;

const rankingListData: { title: string; total: number }[] = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

interface SalesCardProps {
  rangePickerValue: [Dayjs, Dayjs];
  salesData: DataItem[];
  loading: boolean;
  handleRangePickerChange: (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => void;
  selectDate: (key: TimeType) => void;
}

const SalesCard: React.FC<SalesCardProps> = ({
  rangePickerValue,
  salesData,
  handleRangePickerChange,
  loading,
  selectDate,
}) => {
  const { styles } = useStyles();

  const timeType = isTimeRangeInPreset(rangePickerValue);

  return (
    <Card loading={loading} variant="borderless" styles={{ body: { padding: '20px 24px 8px 24px' } }}>
      <div className={styles.salesCard}>
        <Tabs

          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <Segmented<string>
                options={[{
                  label: '今日', value: 'today'
                }, {
                  label: '本周', value: 'week'
                }, {
                  label: '本月', value: 'month'
                }, {
                  label: '本年', value: 'year'
                }]}
                onChange={(value) => {
                  selectDate(value as TimeType)
                }}
                value={timeType as string | undefined}
              />
              <RangePicker
                value={rangePickerValue as [Dayjs, Dayjs]}
                onChange={(dates, dateStrings) => {
                  handleRangePickerChange(dates as [Dayjs, Dayjs], dateStrings as [string, string]);
                }}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"

          tabBarStyle={{ marginBottom: 24 }}

          items={[
            {
              key: 'sales',
              label: '销售额',
              children: <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Echarts option={{
                      grid: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                      xAxis: {
                        type: 'category',
                        data: salesData.map(item => item.x),
                      },
                      yAxis: {
                        type: 'value'
                      },
                      series: [
                        {
                          data: salesData.map(item => item.y),
                          type: 'bar',
                          itemStyle: {
                            color: '#1890FF'
                          }
                        }
                      ]
                    } as ECOption}>
                    </Echarts>
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? 'styles.active' : ''}`}>
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span >
                            {format(",")(item.total)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            },
            {
              key: 'views',
              label: '访问量',
              children: <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Echarts option={{
                      grid: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                      xAxis: {
                        type: 'category',
                        data: salesData.map(item => item.x),
                      },
                      yAxis: {
                        type: 'value',
                      },
                      series: [
                        {
                          data: salesData.map(item => item.y),
                          type: 'bar',
                          itemStyle: {
                            color: '#1890FF'
                          }
                        }
                      ]
                    } as ECOption}>
                    </Echarts>
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? 'styles.active' : ''}`}>
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span>{format(",")(item.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            },
          ]}
        >
        </Tabs>
      </div>
    </Card>
  );
};

export default SalesCard;
