import { useEffect, useState, type FC } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import { Radar } from '@ant-design/charts';
import EditableLinkGroup from './components/EditableLinkGroup';
import type { ActivitiesType, AnalysisData, CurrentUser, NoticeType } from './data.d';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import useStyles from './style';
import { getActivities, getFakeChartData, getProjectNotice } from '@/api/workplace';
import { dayjs } from '@/plugins';

// 快速导航链接配置
const QUICK_LINKS = [
  { title: '操作一', href: '' },
  { title: '操作二', href: '' },
  { title: '操作三', href: '' },
  { title: '操作四', href: '' },
  { title: '操作五', href: '' },
  { title: '操作六', href: '' },
];

// 当前用户信息配置
const CURRENT_USER: Partial<CurrentUser> = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  name: '吴彦祖',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
};

/**
 * 页面头部内容组件
 * 显示用户头像、姓名、职位等信息
 */
const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const { styles } = useStyles();

  // 如果用户信息不存在或为空，显示骨架屏
  if (!currentUser || !Object.keys(currentUser).length) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，{currentUser.name}，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} | {currentUser.group}
        </div>
      </div>
    </div>
  );
};

/**
 * 页面头部额外内容组件
 * 显示统计数据：项目数、团队排名、项目访问量
 */
const ExtraContent: FC = () => {
  const { styles } = useStyles();
  
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2223} />
      </div>
    </div>
  );
};

/**
 * 工作台页面主组件
 * 展示项目列表、动态信息、统计数据等
 */
export const Workplace: FC = () => {
  const { styles } = useStyles();
  
  // 状态管理
  const [projectNotice, setProjectNotice] = useState<NoticeType[]>([]); // 项目通知列表
  const [activities, setActivities] = useState<ActivitiesType[]>([]); // 动态列表
  const [data, setData] = useState<AnalysisData>(); // 图表数据
  const [loading, setLoading] = useState(true); // 加载状态

  // 数据获取
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 并行请求三个接口，提升性能
        const [projectNoticeRes, activitiesRes, dataRes] = await Promise.all([
          getProjectNotice(),
          getActivities(),
          getFakeChartData(),
        ]);
        
        // 更新状态
        setProjectNotice(projectNoticeRes.data);
        setActivities(activitiesRes.data);
        setData(dataRes.data);
      } catch (error) {
        console.error('Failed to fetch workplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * 渲染动态列表项
   * 解析模板字符串中的占位符，生成可点击的链接
   */
  const renderActivities = (item: ActivitiesType) => {
    // 解析模板字符串，将 @{key} 格式的占位符替换为对应的链接
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      const item_ = item[key as keyof ActivitiesType];
      // 如果是对象且包含 link 和 name 属性，渲染为链接
      if (item_ && typeof item_ === 'object' && 'link' in item_ && 'name' in item_) {
        return (
          <a href={item_.link} key={item_.name}>
            {item_.name}
          </a>
        );
      }
      return key;
    });

    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {dayjs().fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer
      content={<PageHeaderContent currentUser={CURRENT_USER} />}
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        {/* 左侧主要内容区域 */}
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          {/* 进行中的项目卡片 */}
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="进行中的项目"
            variant="borderless"
            extra={<Link to="/">全部项目</Link>}
            loading={loading}
            styles={{ body: { padding: 0 } }}
          >
            {projectNotice.map((item: NoticeType) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card.Meta
                  title={
                    <div className={styles.cardTitle}>
                      <Avatar size="small" src={item.logo} />
                      <Link to={item.href}>{item.title}</Link>
                    </div>
                  }
                  description={item.description}
                />
                <div className={styles.projectItemContent}>
                  <Link to={item.memberLink}>{item.member || ''}</Link>
                  {item.updatedAt && (
                    <span className={styles.datetime} title={item.updatedAt}>
                      {dayjs().fromNow()}
                    </span>
                  )}
                </div>
              </Card.Grid>
            ))}
          </Card>
          
          {/* 动态列表卡片 */}
          <Card
            styles={{ body: { padding: 0 } }}
            variant="borderless"
            className={styles.activeCard}
            title="动态"
            loading={loading}
          >
            <List<ActivitiesType>
              loading={loading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        
        {/* 右侧侧边栏区域 */}
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          {/* 快速导航卡片 */}
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            variant="borderless"
            styles={{ body: { padding: 0 } }}
          >
            <EditableLinkGroup onAdd={() => {}} links={QUICK_LINKS} linkElement={Link} />
          </Card>
          
          {/* 雷达图卡片 */}
          <Card
            style={{ marginBottom: 24 }}
            variant="borderless"
            title="XX 指数"
            loading={!data?.radarData?.length}
          >
            <div className={styles.chart}>
              <Radar
                height={343}
                data={data?.radarData || []}
                seriesField="name"
                xField="label"
                yField="value"
                point={{}}
                legend={{
                  position: 'bottom',
                }}
              />
            </div>
          </Card>
          
          {/* 团队成员卡片 */}
          <Card
            styles={{ body: { paddingTop: 12, paddingBottom: 12 } }}
            variant="borderless"
            title="团队"
            loading={loading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item: NoticeType) => (
                  <Col span={12} key={`members-item-${item.id}`}>
                    <Link to={item.href}>
                      <Avatar src={item.logo} size="small" />
                      <span className={styles.member}>{item.member}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
