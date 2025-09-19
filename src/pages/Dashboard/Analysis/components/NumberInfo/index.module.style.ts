import { createStyles, cx } from "antd-style";

const useStyles = createStyles(({ token, css }) => {
  const suffix = cx(css`
    margin-left: 4px;
    color: ${token.colorText};
    font-size: 16px;
    font-style: normal;
  `);

  const numberInfoTitle = cx(css`
    margin-bottom: 16px;
    color: ${token.colorText};
    font-size: ${token.fontSizeLG};
    transition: all 0.3s;
  `);

  const numberInfoSubTitle = cx(css`
    height: 22px;
    overflow: hidden;
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSize};
    line-height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `);

  const numberInfoValue = cx(css`
    margin-top: 4px;
    overflow: hidden;
    font-size: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    
    & > span {
      display: inline-block;
      height: 32px;
      margin-right: 32px;
      color: ${token.colorTextHeading};
      font-size: 24px;
      line-height: 32px;
    }
  `);

  const subTotal = cx(css`
    margin-right: 0;
    color: ${token.colorTextSecondary};
    font-size: ${token.fontSizeLG};
    vertical-align: top;
    
    .anticon {
      margin-left: 4px;
      font-size: 12px;
      transform: scale(0.82);
    }
    
    :global {
      .anticon-caret-up {
        color: ${token.red6};
      }
      .anticon-caret-down {
        color: ${token.green6};
      }
    }
  `);

  const numberInfolight = cx(css`
    .numberInfoValue {
      & > span {
        color: ${token.colorText};
      }
    }
  `);

  return {
    numberInfo: css`
      .suffix {
        ${suffix}
      }
      .numberInfoTitle {
        ${numberInfoTitle}
      }
      .numberInfoSubTitle {
        ${numberInfoSubTitle}
      }
      .numberInfoValue {
        ${numberInfoValue}
        .subTotal {
          ${subTotal}
        }
      }
    `,
    numberInfolight,
    suffix,
    numberInfoTitle,
    numberInfoSubTitle,
    numberInfoValue,
    subTotal,
  };
});

export default useStyles;
