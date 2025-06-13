import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import './index.css'

// Import components
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import UserDetailPage from './pages/UserDetailPage'
import NewUserPage from './pages/NewUserPage'
import ShowcasePage from './pages/ShowcasePage'

// 🚀 Day 5: Import loaders
import { createLoaders } from './pages/loaders'

// 🚀 Day 6: Import actions
import { createActions } from './pages/actions'

// สร้าง QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (เดิมชื่อ cacheTime)
    },
  },
})

// 🎨 Material-UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

// 🚀 Day 5: สร้าง loader instances
const loaders = createLoaders(queryClient)

// 🚀 Day 6: สร้าง action instances
const actions = createActions(queryClient)

// 🚀 Day 5: Configure Router with Loaders
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
        element: <UsersPage />,
        loader: loaders.users, // 🔗 ผูก loader สำหรับ users
      },
      {
        path: '/users/new',
        element: <NewUserPage />,
        action: actions.createUser, // 🎯 ผูก action สำหรับสร้าง user
      },
      {
        path: '/users/:userId',
        element: <UserDetailPage />,
        loader: loaders.user, // 🔗 ผูก loader สำหรับ user detail
      },
      {
        path: '/showcase',
        element: <ShowcasePage />,
        loader: loaders.users, // 🎨 ใช้ loader เดียวกับ users page
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* หุ้ม RouterProvider ด้วย QueryClientProvider และ Material-UI ThemeProvider */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
