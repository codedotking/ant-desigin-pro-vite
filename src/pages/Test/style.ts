import { createStyles } from "antd-style";




export const useStyles = createStyles(({ token, css, prefixCls }) => {
    const title = css` // 先给值不然 cx(title) 获取的类名是固定的
        color: red;
    `;

    const box = css` // 先给值不然 cx(box) 获取的类名是固定的
        .${prefixCls}-${title.name} {
            color: blue;
        }
    `


    console.log(`${prefixCls}-${title.name}`);

    const wrap = css`
        color: ${token.colorPrimary};
        font-style: normal;

        .${prefixCls}-${box.name} {         // 追加样式
           .${prefixCls}-${title.name} {    // 追加样式
                color: yellow;
            }
        }
    `
    return {
        wrap,
        title,
        box
    }
});  