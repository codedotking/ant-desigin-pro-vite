import dayjs from "dayjs";
import { useStyles } from "./style"

export const Test = () => {
    const { styles } = useStyles()


    console.log(dayjs().subtract(2819, 'day').format('YYYY-MM'));
    



    return <div className={styles.wrap}>
        <div className={styles.test}> 我是wrap下的标题的标题</div>
        <div className={styles.box}>
            <div className={styles.title}>
                我是box下的标题
            </div>
        </div>
    </div>
}