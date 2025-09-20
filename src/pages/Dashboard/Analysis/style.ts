import { createStyles, cx } from "antd-style";

export const useStyles = createStyles(({ token, css }) => {
  const iconGroup = cx(css`
    span.anticon {
      margin-left: 16px;
      color: ${token.colorTextSecondary};
      cursor: pointer;
      transition: color 0.32s;
      &:hover {
        color: ${token.colorText};
      }
    }
  `);

  const rankingItemNumber = cx(css`
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 1.5px;
    margin-right: 16px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    background-color: ${token.colorFillSecondary};
    border-radius: 20px;

    &.active {
      color: #fff;
      background-color: #314659;
    }
  `);

  const rankingItemTitle = cx(css`
    flex: 1;
    margin-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `);

  const rankingList = cx(css`
    margin: 25px 0 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      margin-top: 16px;
      zoom: 1;

      &::before,
      &::after {
        display: table;
        content: " ";
      }
      &::after {
        clear: both;
        height: 0;
        font-size: 0;
        visibility: hidden;
      }

      span {
        color: ${token.colorText};
        font-size: 14px;
        line-height: 22px;
      }

      .rankingItemNumber {
        ${rankingItemNumber}
      }

      .rankingItemTitle {
        ${rankingItemTitle}
      }
    }
  `);

  const salesExtra = cx(css`
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
      color: ${token.colorText};
      &:hover {
        color: ${token.colorPrimary};
      }
      &.currentDate {
        color: ${token.colorPrimary};
      }
    }
  `);

  const salesBar = cx(css`
    padding: 0 0 32px 32px;
  `);

  const salesRank = cx(css`
    padding: 0 32px 32px 72px;
  `);

  const salesCard = cx(css`
    .salesBar {
      ${salesBar}
    }
    .salesRank {
      ${salesRank}
    }

    :global {
      .ant-tabs-bar,
      .ant-tabs-nav-wrap {
        padding-left: 16px;
        .ant-tabs-nav .ant-tabs-tab {
          padding-top: 16px;
          padding-bottom: 14px;
          line-height: 24px;
        }
      }
      .ant-tabs-extra-content {
        padding-right: 24px;
        line-height: 55px;
      }
      .ant-card-head {
        position: relative;
      }
      .ant-card-head-title {
        align-items: normal;
      }
    }
  `);

  const salesCardExtra = cx(css`
    height: inherit;
  `);

  const salesTypeRadio = cx(css`
    // position: absolute;
    // right: 54px;
    // bottom: 12px;
  `);

  const offlineCard = cx(css`
    :global {
      .ant-tabs-ink-bar {
        bottom: auto;
      }
      .ant-tabs-bar {
        border-bottom: none;
      }
      .ant-tabs-nav-container-scrolling {
        padding-right: 40px;
        padding-left: 40px;
      }
      .ant-tabs-tab-prev-icon::before {
        position: relative;
        left: 6px;
      }
      .ant-tabs-tab-next-icon::before {
        position: relative;
        right: 6px;
      }
      .ant-tabs-tab-active h4 {
        color: ${token.colorPrimary};
      }
    }
  `);

  const trendText = cx(css`
    margin-left: 8px;
    color: ${token.colorTextHeading};
  `);

  const rankingTitle = cx(css`
    @media screen and (max-width: ${token.screenMD}px) {
      margin-top: 16px;
    }
  `);

  const salesExtraWrap = cx(css`
    display: flex;
    gap: 8px;

    @media screen and (max-width: ${token.screenSM}px) {
      display: none;
    }
  `);

  return {
    iconGroup,
    rankingList,
    rankingItemNumber,
    rankingItemTitle,
    salesExtra,
    salesBar,
    salesRank,
    salesCard,
    salesCardExtra,
    salesTypeRadio,
    offlineCard,
    trendText,
    rankingTitle,
    salesExtraWrap,
  };
});

export default useStyles;
