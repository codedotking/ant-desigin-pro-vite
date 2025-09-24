import { createStyles, css } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  const textOverflow = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `;

  const clearfix = css`
    zoom: 1;
    &::before,
    &::after {
      display: table;
      content: ' ';
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  `;


  const username = css`
    color: ${token.colorText};
  `
  const event = css`
    font-weight: normal;
  `

  const activitiesList = css`
    padding: 0 24px 8px 24px;
    
    .username {
      ${username}
    }
    
    .event {
      ${event}
    }
  `;

  const avatar = css`
    flex: 0 1 72px;
    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  `

  const contentTitle = css`
    margin-bottom: 12px;
    color: ${token.colorTextHeading};
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  `

  const content = css`
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: ${token.colorTextSecondary};
    line-height: 22px;
    
    .contentTitle {
      ${contentTitle}
    }
  `

  const pageHeaderContent = css`
    display: flex;
    
    .avatar {
      ${avatar}
    }
    
    .content {
      ${content}
    }
  `;

  const statItem = css`
    position: relative;
    display: inline-block;
    padding: 0 32px;
    
    > p:first-child {
      margin-bottom: 4px;
      color: ${token.colorTextSecondary};
      font-size: ${token.fontSize}px;
      line-height: 22px;
    }
    
    > p {
      margin: 0;
      color: ${token.colorTextHeading};
      font-size: 30px;
      line-height: 38px;
      
      > span {
        color: ${token.colorTextSecondary};
        font-size: 20px;
      }
    }
    
    &::after {
      position: absolute;
      top: 8px;
      right: 0;
      width: 1px;
      height: 40px;
      background-color: ${token.colorSplit};
      content: '';
    }
    
    &:last-child {
      padding-right: 0;
      &::after {
        display: none;
      }
    }
  `

  const extraContent = css`
    ${clearfix}
    float: right;
    white-space: nowrap;
    
    .statItem {
      ${statItem}
    }
  `;


  const member = css`
    margin-left: 12px;
    font-size: ${token.fontSize}px;
    line-height: 24px;
    vertical-align: top;
  `

  const members = css`
    a {
      display: block;
      height: 24px;
      margin: 12px 0;
      color: ${token.colorText};
      transition: all 0.3s;
      ${textOverflow}
      
      .member {
        ${member}
      }
      
      &:hover {
        color: ${token.colorPrimary};
      }
    }
  `;

  const datetime = css`
    flex: 0 0 auto;
    float: right;
    color: ${token.colorTextDisabled};
  `;

  const projectItemContent = css`
    display: flex;
    height: 20px;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    ${textOverflow}
    
    a {
      display: inline-block;
      flex: 1 1 0;
      color: ${token.colorTextSecondary};
      ${textOverflow}
      
      &:hover {
        color: ${token.colorPrimary};
      }
    }
    
    .datetime {
       ${datetime}
    }
  `
  const projectGrid = css`
    width: 33.33%;
  }`


  const chart = css`
  `

  const cardTitle = css`
    font-size: 0;
    
    a {
      display: inline-block;
      height: 24px;
      margin-left: 12px;
      color: ${token.colorTextHeading};
      font-size: ${token.fontSize}px;
      line-height: 24px;
      vertical-align: top;
      
      &:hover {
        color: ${token.colorPrimary};
      }
    }
  `


  const projectList = css`
    :global {
      .ant-card-meta-description {
        height: 44px;
        overflow: hidden;
        color: ${token.colorTextSecondary};
        line-height: 22px;
      }
    }
    
    .cardTitle {
      ${cardTitle}
    }
    
    .projectGrid {
      ${projectGrid}
    }
    
    .projectItemContent {
      ${projectItemContent}
    }
  `;


  const activeCard = css`
    @media screen and (max-width: ${token.screenXL}px) and (min-width: ${token.screenLG}px) {
      margin-bottom: 24px;
    }
    
    @media screen and (max-width: ${token.screenLG}px) {
      margin-bottom: 24px;
    }
  `;

  const responsiveExtraContent = css`
    @media screen and (max-width: ${token.screenXL}px) and (min-width: ${token.screenLG}px) {
      margin-left: -44px;
      
      .statItem {
        padding: 0 16px;
      }
    }
    
    @media screen and (max-width: ${token.screenLG}px) {
      float: none;
      margin-right: 0;
      
      .statItem {
        padding: 0 16px;
        text-align: left;
        
        &::after {
          display: none;
        }
      }
    }
    
    @media screen and (max-width: ${token.screenMD}px) {
      margin-left: -16px;
    }
    
    @media screen and (max-width: ${token.screenSM}px) {
      .statItem {
        float: none;
      }
    }
  `;

  const responsiveMembers = css`
    @media screen and (max-width: ${token.screenXL}px) and (min-width: ${token.screenLG}px) {
      margin-bottom: 0;
    }
    
    @media screen and (max-width: ${token.screenLG}px) {
      margin-bottom: 0;
    }
  `;

  const responsivePageHeaderContent = css`
    @media screen and (max-width: ${token.screenSM}px) {
      display: block;
      
      .content {
        margin-left: 0;
      }
    }
  `;

  const responsiveProjectList = css`
    @media screen and (max-width: ${token.screenMD}px) {
      .projectGrid {
        width: 50%;
      }
    }
    
    @media screen and (max-width: ${token.screenXS}px) {
      .projectGrid {
        width: 100%;
      }
    }
  `;

  return {
    textOverflow,
    clearfix,
    activitiesList,
    pageHeaderContent,
    extraContent,
    members,
    projectList,
    datetime,
    activeCard,
    responsiveExtraContent,
    responsiveMembers,
    responsivePageHeaderContent,
    responsiveProjectList,
    projectItemContent,
    projectGrid,
    cardTitle,
    chart,
    member,
    username,
    event,
    statItem,
    avatar,
    contentTitle,
    content,
  };
});

export default useStyles;
