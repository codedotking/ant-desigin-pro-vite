import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import NoFoundPage from '@/pages/404'
import { Analysis, Monitor, Workplace } from '@/pages/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />
      },
      {
        path: 'dashboard',
        element: <Navigate to="/dashboard/analysis" replace />
      },
      {
        path: 'dashboard/analysis',
        element: <Analysis />
      },
      {
        path: 'dashboard/monitor',
        element: <Monitor />
      },
      {
        path: 'dashboard/workplace',
        element: <Workplace />
      },
      {
        path: 'welcome',
        element: <Home />
      },
      {
        path: '*',
        element: <NoFoundPage />
      }
    ]
  },
  {
    path: '/user/login',
    element: <Login />
  }
])
