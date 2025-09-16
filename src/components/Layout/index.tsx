import { Outlet } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
import { Sider } from './Sider'
import { Header } from './Header'

const { Content } = AntLayout

export function Layout() {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider />
      <AntLayout style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{
          margin: '16px',
          padding: '24px',
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
