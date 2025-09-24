import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css }) => ({
  card: css`
    margin-bottom: 24px;
  `,
  result: css`
    max-width: 560px;
    margin: 0 auto;
    padding: 24px 0 8px;
  `
}));
