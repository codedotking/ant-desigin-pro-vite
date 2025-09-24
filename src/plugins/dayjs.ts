import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn.js";
dayjs.extend(relativeTime);


export {
    dayjs
};