import { Layout, Avatar, Dropdown, Space, type MenuProps, message, Modal } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
// import { getUserInfo } from '@/api/user'

const { Header: AntHeader } = Layout

export function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出',
      content: '您确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // await logout()
          message.success('退出登录成功')
          navigate('/login')
        } catch {
          message.error('退出登录失败')
        }
      }
    })
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        message.info('个人中心功能开发中')
        break
      case 'settings':
        message.info('设置功能开发中')
        break
      case 'logout':
        handleLogout()
        break
    }
  }

  const items = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    }
  ] as MenuProps['items']

  return (
    <AntHeader style={{
      padding: '0 24px',
      background: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ 
        fontSize: '18px', 
        fontWeight: '600',
        color: '#1e293b'
      }}>
        <span style={{ color: '#3b82f6' }}>Ant Design</span> Pro
      </div>
      <Space>
        <Dropdown 
          menu={{ items, onClick: handleMenuClick }} 
          placement="bottomRight"
        >
          <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </Space>
    </AntHeader>
  )
}
