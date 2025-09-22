import { echarts } from "@/plugins";
import { useEffect, useState } from "react";

import { geoData } from '../../data';
import { Echarts } from "@/components/ECharts";
import type { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes.js";

const Map = () => {
  const [geoJSON, setGeoJSON] = useState<GeoJSONSourceInput | null>(null);
  const [isMapRegistered, setIsMapRegistered] = useState(false);

  useEffect(() => {
    if (geoJSON) {
      echarts.registerMap('ch', geoJSON);
      setIsMapRegistered(true);
    }
  }, [geoJSON]);

  useEffect(() => {
    // 保留setTimeout模拟异步加载
    const timeOut = setTimeout(() => {
      setGeoJSON(geoData as GeoJSONSourceInput);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const option = {
    geo: {
      map: 'ch',
      roam: true,
      // aspectScale: Math.cos((47 * Math.PI) / 180),
      nameProperty: 'Short_Name_ZH', // If using en name.
      label: {
        show: true,
        textBorderColor: '#fff',
        textBorderWidth: 2
      }
    },
    tooltip: {},
    series: [
      {
        type: 'graph',
        coordinateSystem: 'geo',
        data: [
          { name: 'a', value: [7.667821250000001, 46.791734269956265] },
          { name: 'b', value: [7.404848750000001, 46.516308805996054] },
          { name: 'c', value: [7.376673125000001, 46.24728858538375] },
          { name: 'd', value: [8.015320625000001, 46.39460918238572] },
          { name: 'e', value: [8.616400625, 46.7020608630855] },
          { name: 'f', value: [8.869981250000002, 46.37539345234199] },
          { name: 'g', value: [9.546196250000001, 46.58676648282309] },
          { name: 'h', value: [9.311399375, 47.182454114178896] },
          { name: 'i', value: [9.085994375000002, 47.55395822835779] },
          { name: 'j', value: [8.653968125000002, 47.47709530818285] },
          { name: 'k', value: [8.203158125000002, 47.44506909144329] }
        ],
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 5,
        lineStyle: {
          color: '#718adbff',
          opacity: 1
        }
      }
    ]
  };

  return <div>
    {
      isMapRegistered && <Echarts option={option} />
    }
  </div>;
};

export default Map