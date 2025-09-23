import { Card, Col, Row, Statistic } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { WordCloud } from '@ant-design/charts';
import Map from './components/Map';
import ActiveChart from './components/ActiveChart';
import useStyles from './style';
import { GridContent } from '@ant-design/pro-components';
import { format } from 'd3-format';
import { RingProgress } from '@/components';
import { tags } from '@/api/tag';
import Gauge from './components/Charts/Gauge';

const { Timer } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const Monitor: FC = () => {
    const [data, setData] = useState({
        list: [],
    });
    const [loading, setLoading] = useState(false);
    const { styles } = useStyles();
    useEffect(() => {
        setLoading(true)
        tags().then((res) => {
            console.log(res);
            setData(res.data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
    }, []);
    const wordCloudData = data?.list || [];

    return (
        <GridContent>
            <>
                <Row gutter={24}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Card title="活动实时交易情况" variant='borderless'>
                            <Row>
                                <Col md={6} sm={12} xs={24}>
                                    <Statistic
                                        title="今日交易总额"
                                        suffix="元"
                                        value={format(",")(124543233)}
                                    />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <Statistic title="销售目标完成率" value="92%" />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <Timer type='countdown' title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <Statistic title="每秒交易总额" suffix="元" value={format(",")(234)} />
                                </Col>
                            </Row>
                            <div className={styles.mapChart}>
                                <Map />
                            </div>
                        </Card>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                        <Card title="活动情况预测" style={{ marginBottom: 24 }} variant='borderless'>
                            <ActiveChart />
                        </Card>
                        <Card
                            title="券核效率"
                            style={{ marginBottom: 24 }}
                            variant='borderless'
                            styles={{ body: { textAlign: 'center' } }}
                        >

                            <Gauge />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Card title="各品类占比" variant='borderless' className={styles.pieCard}>
                            <Row style={{ padding: '16px 0' }}>
                                <Col span={8}>
                                    <RingProgress height={128} percent={0.28} />
                                </Col>
                                <Col span={8}>
                                    <RingProgress  height={128} percent={0.22} />
                                </Col>
                                <Col span={8}>
                                    <RingProgress  height={128} percent={0.32} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        {/* <Card
                            title="热门搜索"
                            loading={loading}
                            variant='borderless'
                            styles={{ body: { overflow: 'hidden' } }}
                        >
                            <WordCloud
                                data={wordCloudData}
                                autoFit
                                wordField="name"
                                weightField="value"
                                colorField="name"
                                height={162}
                                wordStyle={{
                                    fontSize: [10, 20],
                                }}
                            />
                        </Card> */}
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                        <Card
                            title="资源剩余"
                            variant='borderless'
                            styles={{ body: { textAlign: 'center', fontSize: 0 } }}
                        >
                            {/* <Liquid
                                height={161}
                                percent={0.35}
                                autoFit
                                outline={{
                                    border: 2,
                                    distance: 4,
                                }}
                                padding={[0, 0, 0, 0]}
                                statistic={{
                                    content: {
                                        style: {
                                            fontSize: '16px',
                                        },
                                    },
                                }}
                            /> */}
                        </Card>
                    </Col>
                </Row>
            </>
        </GridContent>
    );
};

export { Monitor };
