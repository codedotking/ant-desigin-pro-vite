import { createStyles, cx } from "antd-style";

const useStyles = createStyles(({ token, css }) => {
    const up = cx(css`
    position: relative;
    top: 1px;
    margin-left: 4px;
    color: ${token.red6};
    
    span {
      font-size: 12px;
      transform: scale(0.83);
    }
  `);

    const down = cx(css`
    position: relative;
    top: -1px;
    margin-left: 4px;
    color: ${token.green6};
    
    span {
      font-size: 12px;
      transform: scale(0.83);
    }
  `);

    const trendItemGrey = cx(css`
    .up,
    .down {
      color: ${token.colorText};
    }
  `);

    const reverseColor = cx(css`
    .up {
      color: ${token.green6};
    }
    .down {
      color: ${token.red6};
    }
  `);

    return {
        trendItem: css`
      display: inline-block;
      font-size: ${token.fontSize};
      line-height: 22px;
      
      .up {
        ${up}
      }
      .down {
        ${down}
      }
      
      &.trendItemGrey {
        ${trendItemGrey}
      }
      
      &.reverseColor {
        ${reverseColor}
      }
    `,
        up,
        down,
        trendItemGrey,
        reverseColor,
    };
});

export default useStyles;
