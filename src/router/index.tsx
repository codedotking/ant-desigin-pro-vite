import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import NoFoundPage from '@/pages/404'

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
