import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import '@ant-design/v5-patch-for-react-19';
import { ProConfigProvider } from '@ant-design/pro-components'
import { App, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ProConfigProvider>
        <ConfigProvider getTargetContainer={() => {
          return document.getElementById('test-pro-layout') || document.body;
        }}>
          <App>
            <RouterProvider router={router} />
          </App>
        </ConfigProvider>
      </ProConfigProvider>
    </StyleProvider>
  </StrictMode>,
)
