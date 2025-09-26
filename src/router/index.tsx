import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import { NoFoundPage, ServerErrorPage } from '@/pages/Exception'
import { Analysis, Monitor, Workplace } from '@/pages/Dashboard'
import { AdvancedForm, StepForm, BasicForm } from '@/pages/Form'
import { Test } from '@/pages/Test'
import { FailPage, SuccessPage } from '@/pages/Result'
import ForbiddenPage from '@/pages/Exception/403'

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
        path: 'test',
        element: <Test />
      },
      {
        path: 'dashboard',
        element: <Navigate to="/dashboard/analysis" replace />
      },
      {
        path: 'result',
        element: <Navigate to="/result/success" replace />
      },
      {
        path: 'result/success',
        element: <SuccessPage />
      },
      {
        path: 'result/fail',
        element: <FailPage />
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
        path: 'exception',
        element: <Navigate to="/exception/403" replace />
      },
      {
        path: 'exception/403',
        element: <ForbiddenPage />
      },
      {
        path: 'exception/404',
        element: <NoFoundPage />
      },
      {
        path: 'exception/500',
        element: <ServerErrorPage />
      },
      {
        path: 'form',
        element: <Navigate to="/form/basic-form" replace />
      },
      {
        path: 'form/basic-form',
        element: <BasicForm />
      },
      {
        path: 'form/step-form',
        element: <StepForm />
      },
      {
        path: 'form/advanced-form',
        element: <AdvancedForm />
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
