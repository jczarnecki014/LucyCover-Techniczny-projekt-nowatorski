import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import DashboardRoot from './pages/dashboard/DashboardRoot'
import RootAuth from './pages/auth/RootAuth'
import LoginPage from './pages/auth/LoginPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'
import PatientsPage,{loader as PatientsPageLoader} from './pages/dashboard/PatientsPage'

const router = createBrowserRouter([
  {
    path: '/',
    children:[
      {
        path:'dashboard',
        element: <DashboardRoot />,
        children:[
          {
            path: 'patients',
            loader: PatientsPageLoader,
            element: <PatientsPage />,
          },
        ]
      },
      {
        path: 'auth',
        element: <RootAuth />,
        children:[
          {index:true, element: <LoginPage />},
          {
            path:'create-account', 
            element: <CreateAccountPage />
          },
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
