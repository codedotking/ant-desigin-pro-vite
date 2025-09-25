import { useStyles } from "./style"

export const Test = () => {
    const { styles } = useStyles()
    return <div className={styles.wrap}>
        <div className={styles.test}> 我是wrap下的标题的标题</div>
        <div className={styles.box}>
            <div className={styles.title}>
                我是box下的标题
            </div>
        </div>
    </div>
}