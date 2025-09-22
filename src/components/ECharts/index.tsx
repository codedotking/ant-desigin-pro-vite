import { echarts } from "@/plugins"
import type { EChartsReactProps } from "echarts-for-react"
import EChartsReactCore from "echarts-for-react/lib/core"
import { useEffect, useRef } from "react"

export const Echarts = (props: Omit<EChartsReactProps, 'echarts'> & {
    rerender?: boolean
}) => {
    const ref = useRef(null)
    useEffect(() => {
        console.log(ref);
    }, [props.rerender])
    return <EChartsReactCore ref={ref} echarts={echarts}  {...props} />
}