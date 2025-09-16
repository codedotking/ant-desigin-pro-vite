import { Card, Row, Col, Statistic, Progress } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

export default function Home() {
  return (
    <div>
      <h1 style={{ 
        marginBottom: '24px',
        color: '#1e293b',
        fontWeight: '600'
      }}>
        欢迎使用 <span style={{ color: '#3b82f6' }}>Ant Design Pro</span>
      </h1>
      
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={112893}
              precision={2}
              valueStyle={{ color: '#059669' }}
              prefix={<ArrowUpOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="访问量"
              value={112893}
              precision={2}
              valueStyle={{ color: '#dc2626' }}
              prefix={<ArrowDownOutlined />}
              suffix="次"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="支付笔数"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3b82f6' }}
              prefix={<ArrowUpOutlined />}
              suffix="笔"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="运营活动效果"
              value={112893}
              precision={2}
              valueStyle={{ color: '#7c3aed' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="进度概览" style={{ height: '300px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}>React 学习进度</div>
              <Progress percent={75} status="active" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}>TypeScript 学习进度</div>
              <Progress percent={60} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}>Ant Design 学习进度</div>
              <Progress percent={90} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="快速开始" style={{ height: '300px' }}>
            <div style={{ lineHeight: '2' }}>
              <p>🎉 恭喜！你已经成功集成了 React Router</p>
              <p>📦 项目使用了最新的 React 19 和 Ant Design 5</p>
              <p>🚀 可以开始开发你的应用了</p>
              <p>📝 查看 src/router/index.tsx 配置路由</p>
              <p>🎨 查看 src/components/Layout 了解布局结构</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
