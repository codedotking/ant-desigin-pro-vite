import { echarts, type ECOption } from "@/plugins"
import type { EChartsReactProps } from "echarts-for-react"
import EChartsReactCore from "echarts-for-react/lib/core"

export const Echarts = (props: Omit<EChartsReactProps, 'echarts' | 'option'> & {
    option: ECOption  // 明确要求 option 参数符合 ECOption 类型
    rerender?: boolean
}) => {
    return <EChartsReactCore echarts={echarts}  {...props} />
}