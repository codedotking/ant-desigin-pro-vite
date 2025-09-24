import { createStyles, css } from 'antd-style';




const useStyles = createStyles(({ token }) => {
  const pieCard = css`
    :global(.pie-stat) {
      font-size: 24px !important;
    }
  `;

  const mapChart = css`
    height: 452px;
    padding-top: 24px;
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 437px;
    }

    @media screen and (max-width: ${token.screenLG}) {
      height: auto;
    }
  `;


  return {
    mapChart,
    pieCard,
  };
});

export default useStyles;