import React from 'react';
import { HeatmapLayer, LarkMap, PointLayer } from '@antv/larkmap';
import { Spin } from 'antd';
import { geoData, gridData } from '../../data';

const colors = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'];

const Map: React.FC = () => {
  const data = geoData;
  const grid = gridData;
  return <Spin spinning={false}>
    <LarkMap
      mapType="Mapbox"
      mapOptions={{
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: 'light',
        zoom: 1,
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '452px',
      }}
    >
      {grid && (
        <HeatmapLayer
          key="1"
          source={{
            data: grid,
            parser: { type: 'geojson' },
            transforms: [
              {
                type: 'hexagon',
                size: 800000,
                field: 'capacity',
                method: 'sum',
              },
            ],
          }}
          color={'#ddd'}
          shape={'hexagon'}
          style={{
            coverage: 0.7,
            opacity: 0.8,
          }}
        />
      )}


      {data && (
        <PointLayer
          key="2"
          source={{
            data,
            parser: { type: 'geojson' },
          }}
          shape='circle'
          state={{
            active: {
              color: '#0c2c84'
            },
          }}
          color={{
            field: 'cum_conf',
            value: colors,
            scale: { type: 'quantile' },
          }}
          size={{
            field: 'cum_conf',
            scale: { 
              type: 'log',
              domain: [1, 100000],
              range: [2, 20]
            }
          }}
          style={{
            opacity: 0.8,
          }}
        />
      )}
    </LarkMap>
  </Spin>;
};

export default Map;
