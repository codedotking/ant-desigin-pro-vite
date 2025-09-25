import { createStyles } from "antd-style";

export const useStyle = createStyles(({ token, css }) => ({
  error_icon: css`
    color: ${token.colorHighlight}
  `,
  title: css`
    margin-bottom: 16px;
    color: ${token.colorTextHeading};
    font-weight: 500;
    font-size: 16px;
  `
}));

