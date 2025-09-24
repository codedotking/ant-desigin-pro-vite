import { css } from '@emotion/css';
import { createStyles } from 'antd-style';




export const useStyles = createStyles(({ token }) => {
  const linkGroup = css`
    padding: 20px 0 8px 24px;
    font-size: 0;

    & > a {
      display: inline-block;
      width: 25 %;
      margin-bottom: 13px;
      color: ${token.colorText};
      font-size: ${token.fontSize};
      &:hover {
        color: ${token.colorPrimary};
      }
    }
  `;
  return {
    linkGroup,
  };
});

