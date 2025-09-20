import { Card, Radio, Segmented, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import React from 'react';
import type { DataItem } from '../data.d';
import { useStyles } from '../style';
import { format } from 'd3-format';

const { Text } = Typography;

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  const { styles } = useStyles();





  console.log("salesPieData",salesPieData);
  

  const pieConfig: PieConfig = {
    autoFit: true,
    height: 300,
    data: salesPieData,
    radius: 1,
    innerRadius: 0.64,
    angleField: 'y',
    colorField: 'x',
    legend: false,
    label: {
      type: 'spider',
      formatter: (_: string, item:{x:string,y:number}) => {
        return `${item.x}: ${format(",")(item.y)}`;
      },
    },
    statistic: {
      title: {
        content: '销售额',
      },
    },
  };

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      variant='borderless'
      title="销售额类别占比"
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          <Segmented<string>
            value={salesType}
            options={[
              {
                label: '全部渠道',
                value: 'all',
              },
              {
                label: '线上',
                value: 'online',
              },
              {
                label: '门店',
                value: 'stores',
              },
            ]}
            onChange={(value) => {
              handleChangeSalesType?.({ target: { value } } as RadioChangeEvent);
            }}
          >
          </Segmented>

          {dropdownGroup}
        </div>
      }
    >
      <div>
        <Text>销售额</Text>
        <Pie {...pieConfig} />
      </div>
    </Card>
  );
};

export default ProportionSales;
