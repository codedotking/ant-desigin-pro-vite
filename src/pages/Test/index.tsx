import dayjs from "dayjs";
import { Result } from "antd";

export const Test = () => {

    console.log(dayjs().subtract(2819, 'day').format('YYYY-MM'));




    return <Result status="success" title="Success">
    </Result>
}

export default Test;