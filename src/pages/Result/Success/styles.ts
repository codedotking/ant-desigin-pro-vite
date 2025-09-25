import { createStyles } from "antd-style";

export const useStyle = createStyles(({ token, css }) => ({
  headTitle: css`
    color: ${token.colorTextHeading}
     margin-bottom: 20px;
    font-weight: 500px;
    font-size: 16px;
  `,
  title: css`
     position: relative;
    color: ${token.colorText};
    font-size: 12px;
    text-align: center;
  `
}));
