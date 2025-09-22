import { echarts } from "@/plugins";
import { useEffect, useState } from "react";
import { geoJSON as geo } from "./data";
import { Echarts } from "@/components/ECharts";
import type { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes.js";
import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from "echarts";

export const Workplace = () => {
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
            setGeoJSON(geo as GeoJSONSourceInput);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    const option = {
        title: {
            text: 'Travel Routes'
        },
        geo: {
            map: 'ch',
            roam: true,
            aspectScale: Math.cos((47 * Math.PI) / 180),
            // nameProperty: 'name_en', // If using en name.
            label: {
                show: true,
                textBorderColor: '#fff',
                textBorderWidth: 2
            }
        },
        tooltip: {},
        series: [
            {
                type: 'custom',
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
                edges: [
                    {
                        source: 'a',
                        target: 'b'
                    },
                    {
                        source: 'b',
                        target: 'c'
                    },
                    {
                        source: 'c',
                        target: 'd'
                    },
                    {
                        source: 'd',
                        target: 'e'
                    },
                    {
                        source: 'e',
                        target: 'f'
                    },
                    {
                        source: 'f',
                        target: 'g'
                    },
                    {
                        source: 'g',
                        target: 'h'
                    },
                    {
                        source: 'h',
                        target: 'i'
                    },
                    {
                        source: 'i',
                        target: 'j'
                    },
                    {
                        source: 'j',
                        target: 'k'
                    }
                ],
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: 5,
                lineStyle: {
                    color: '#718adbff',
                    opacity: 1
                },
                renderItem(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
                    // 对于 data 中的每个 dataItem，都会调用这个 renderItem 函数。
                    // （但是注意，并不一定是按照 data 的顺序调用）

                    // 这里进行一些处理，例如，坐标转换。
                    // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
                    const categoryIndex = api.value(0);
                    // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                    const startPoint = api.coord([api.value(1), categoryIndex]);
                    const endPoint = api.coord([api.value(2), categoryIndex]);
                    // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
                    const height = api.size([0, 1])[1] * 0.6;

                    // shape 属性描述了这个矩形的像素位置和大小。
                    // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
                    // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
                    // 如果矩形完全被剪掉，会返回 undefined.
                    const rectShape = echarts.graphic.clipRectByRect({
                        // 矩形的位置和大小。
                        x: startPoint[0],
                        y: startPoint[1] - height / 2,
                        width: endPoint[0] - startPoint[0],
                        height: height
                    }, {
                        // 当前坐标系的包围盒。
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    });

                    // 这里返回为这个 dataItem 构建的图形元素定义。
                    return rectShape && {
                        // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                        type: 'rect',
                        shape: rectShape,
                        // 用 api.style(...) 得到默认的样式设置。这个样式设置包含了
                        // option 中 itemStyle 的配置和视觉映射得到的颜色。
                        style: api.style()
                    };
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