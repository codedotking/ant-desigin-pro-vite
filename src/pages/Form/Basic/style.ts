import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => ({
    optional: css`
        color: ${token.colorTextSecondary};
        font-style: normal;
    `
}));