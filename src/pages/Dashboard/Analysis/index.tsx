import { request } from "@/utils/request";
import { EllipsisOutlined } from "@ant-design/icons";
import { StatisticCard } from "@ant-design/pro-components";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";


export const Analysis = () => {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        request.get('/api/fake_analysis_chart_data').then(res => {
            console.log(res);
            setChartData(res.data);
        });
    }, []);



    return <StatisticCard
        title="大盘趋势"
        tooltip="大盘说明"
        style={{ maxWidth: 480 }}
        extra={<EllipsisOutlined />}
        chart={
            <Skeleton loading={!chartData} active >
                <img
                    src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
                    alt="柱状图"
                    width="100%"
                />
            </Skeleton>
        }
    />

}
