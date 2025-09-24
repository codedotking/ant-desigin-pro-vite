import { echarts, type ECOption } from "@/plugins"
import type { EChartsReactProps } from "echarts-for-react"
import EChartsReactCore from "echarts-for-react/lib/core"
import { useImperativeHandle, useRef, type RefObject } from "react"

export const Echarts = (props: Omit<EChartsReactProps, 'echarts' | 'option'> & {
    option: ECOption
    rerender?: boolean
    ref?: RefObject<EChartsReactCore>
}) => {
    const ecRef = useRef<EChartsReactCore>(null)
    const { ref, opts, ...rest } = props

    // 修复：应该返回 ecRef.current 而不是 ref.current
    useImperativeHandle(ref, () => ecRef.current!)

    return <EChartsReactCore ref={ecRef} echarts={echarts} opts={{
        renderer: 'svg',
        ...opts,
    }} {...rest} />
}