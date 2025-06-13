import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import components
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import UserDetailPage from './pages/UserDetailPage'

// Configure Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/users/:userId',
        element: <UserDetailPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
