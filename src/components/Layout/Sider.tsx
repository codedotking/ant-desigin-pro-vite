import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined,
  DashboardOutlined 
} from '@ant-design/icons'

const { Sider: AntSider } = Layout

export function Sider() {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘'
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理'
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <AntSider 
      width={200} 
      style={{ 
        background: '#ffffff',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #e5e7eb',
        boxShadow: '2px 0 8px rgba(0,0,0,0.06)'
      }}
    >
      <div style={{ 
        height: '32px', 
        margin: '16px', 
        background: '#3b82f6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        Ant Design Pro
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </AntSider>
  )
}
