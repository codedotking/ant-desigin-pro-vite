import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => {

  const errorIcon = css`{
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: ${token.colorError};
  }`
  const errorField = css`{
      margin-top: 2px;
      color: ${token.colorTextSecondary};
      font-size: 12px;
    }`


  return {
    card: css`{
      margin-bottom: 24px;
      .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
        width: 100%;
      }
    }`,
    errorIcon: css`{
      margin-right: 24px;
      color: ${token.colorError};
      cursor: pointer;

      span.anticon {
        margin-right: 4px;
      }
    }`,
    errorPopover: css`{
      background: ${token.colorBgElevated};
        .ant-popover-inner-content {
          min-width: 256px;
          max-height: 290px;
          padding: 0;
          overflow: auto;
        }
    }`,
    errorListItem: css` {
      padding: 8px 16px;
      list-style: none;
      border-bottom: 1px solid ${token.colorBorder};
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: ${token.colorFillAlter};
      }
      &:last-child {
        border: 0;
      }
      .errorIcon {
      ${errorIcon}
      }
      .errorField {
        ${errorField}
      }
    }`,
    editable: css`{
      td {
        padding-top: 13px !important;
        padding-bottom: 12.5px !important;
      }
    }`,
    errorField
  }
});