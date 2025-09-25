import { createStyles, cx } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => {

  const baseErrorIcon = css`
      color: ${token.colorError};
      cursor: pointer;
  `

  const errorIcon = cx(baseErrorIcon, css` 
      display: inline-flex;
      gap: 8px;
      align-items: center;
  `)

  const errorField = cx(css` 
     margin-top: 2px;
     color: ${token.colorTextSecondary};
     font-size: 12px;
  `)



  return {
    card: css`
      margin-bottom: 24px;
      .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
        width: 100%;
      }
    `,
    errorIcon,
    errorPopover: css`
      background: ${token.colorBgElevated};
      .ant-popover-inner-content {
        min-width: 256px;
        max-height: 290px;
        padding: 0;
        overflow: auto;
      }
    `,
    errorListItem: css` 
      padding: 8px 16px;
      list-style: none;
      border-bottom: 1px solid ${token.colorBorder};
      cursor: pointer;
      transition: all 0.3s;

      display: flex;
      align-items: start;
      gap: 8px;

      &:hover {
        background: ${token.colorFillAlter};
      }
      &:last-child {
        border: 0;
      }
    `,
    errorField
  }
});