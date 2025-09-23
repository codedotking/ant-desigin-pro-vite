import { Card, Segmented, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import type { DataItem } from '../data.d';
import { useStyles } from '../style';
import { format } from 'd3-format';
import { Echarts } from '@/components';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

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
        <Echarts
          option={{
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                type: 'pie',
                radius: ['60%', '90%'],
                label: {
                  show: true,
                  formatter: (params: CallbackDataParams) => {
                    return `${params.name}: ${format(",")(params.value as number)}`;
                  },
                },
                data: salesPieData.map((item) => ({ value: item.y, name: item.x })),
              }
            ]
          }}
        />
      </div>
    </Card>
  );
};

export default ProportionSales;
