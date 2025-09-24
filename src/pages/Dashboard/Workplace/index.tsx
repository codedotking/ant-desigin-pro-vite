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

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const { styles } = useStyles();

  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => {
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

const Workplace: FC = () => {
  const { styles } = useStyles();
  const [projectNotice, setProjectNotice] = useState<NoticeType[]>([]);
  const [activities, setActivities] = useState<ActivitiesType[]>([]);
  const [data, setData] = useState<AnalysisData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectNotice = await getProjectNotice();
        const activities = await getActivities();
        const data = await getFakeChartData();
        setProjectNotice(projectNotice.data);
        setActivities(activities.data);
        setData(data.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, []);



  const renderActivities = (item: ActivitiesType) => {

    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      const item_ = item[key as keyof ActivitiesType];
      if (item_ && typeof item_ === 'object' && 'link' in item_ && 'name' in item_) {
        return (
          <a href={item_.link}
            key={item_.name}>
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
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: '吴彦祖',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          }}
        />
      }
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
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
                {/* <Card styles={{ body: { padding: 0 } }} variant="borderless" > */}
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
                {/* </Card> */}
              </Card.Grid>
            ))}
          </Card>
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
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            variant="borderless"
            styles={{ body: { padding: 0 } }}
          >
            <EditableLinkGroup onAdd={() => { }} links={links} linkElement={Link} />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            variant="borderless"
            // styles={{ body: { padding: 0 } }}
            title="XX 指数"
            loading={data?.radarData?.length === 0}
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

export {
  Workplace
};
