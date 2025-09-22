import { echarts } from "@/plugins"
import type { EChartsReactProps } from "echarts-for-react"
import EChartsReactCore from "echarts-for-react/lib/core"

export const Echarts = (props: Omit<EChartsReactProps, 'echarts'> & {
    rerender?: boolean
}) => {
    return <EChartsReactCore echarts={echarts}  {...props} />
}