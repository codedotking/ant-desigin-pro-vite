import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css }) => {

  const activeChart = css`
      position: relative;
    `;

  const activeChartGrid = css`
      p {
        position: absolute;
        top: 80px;
      }
      p:last-child {
        top: 115px;
      }
    `;

  const activeChartLegend = css`
      position: relative;
      height: 20px;
      margin-top: 8px;
      font-size: 0;
      line-height: 20px;
      span {
        display: inline-block;
        width: 33.33%;
        font-size: 12px;
        text-align: center;
      }
      span:first-child {
        text-align: left;
      }
      span:last-child {
        text-align: right;
      }
    `;


  const line = css` 
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, transparent 50%, #e9e9e9 50%);
        background-size: 6px;
    `;

  const dashedLine = css`
      position: relative;
      top: -70px;
      left: -3px;
      height: 1px;


      :last-child {
        top: -36px;
      }
    `;


  return {
    activeChart,
    activeChartGrid,
    activeChartLegend,
    dashedLine,
    line,
  }
});