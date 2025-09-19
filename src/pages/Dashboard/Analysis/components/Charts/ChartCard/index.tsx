import { Card } from 'antd';
import type { CardProps } from 'antd/es/card';
import React from 'react';
import classNames from 'classnames';
import { useStyles } from './index.style';

type totalType = () => React.ReactNode;

const renderTotal = (styles: ReturnType<typeof useStyles>['styles'], total?: number | totalType | React.ReactNode) => {
  if (!total && total !== 0) {
    return null;
  }
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className={styles.total}>{total()}</div>;
      break;
    default:
      totalDom = <div className={styles.total}>{total}</div>;
  }
  return totalDom;
};

export type ChartCardProps = {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
} & CardProps;

const ChartCard: React.FC<ChartCardProps> = (props) => {
  const {
    loading = false,
    contentHeight,
    title,
    avatar,
    action,
    total,
    footer,
    children,
    variant = "borderless",
    ...rest
  } = props;
  const { styles } = useStyles();

  const renderContent = () => {
    if (loading) {
      return false;
    }
    return (
      <div className={styles.chartCard}>
        <div
          className={classNames(styles.chartTop, {
            [styles.chartTopMargin]: !children && !footer,
          })}
        >
          <div className={styles.avatar}>{avatar}</div>
          <div className={styles.metaWrap}>
            <div className={styles.meta}>
              <span className={styles.title}>{title}</span>
              <span className={styles.action}>{action}</span>
            </div>
            {renderTotal(styles, total)}
          </div>
        </div>
        {children && (
          <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
            <div className={contentHeight ? styles.contentFixed : undefined}>{children}</div>
          </div>
        )}
        {footer && (
          <div
            className={classNames(styles.footer, {
              [styles.footerMargin]: !children,
            })}
          >
            {footer}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card loading={loading}
      title={title}
      variant={variant}
      styles={{ body: { padding: '20px 24px 8px 24px' } }}
      {...rest}>
      {renderContent()}
    </Card>
  );
};

export default ChartCard;
