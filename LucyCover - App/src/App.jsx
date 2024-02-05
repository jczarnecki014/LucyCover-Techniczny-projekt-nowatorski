import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import DashboardRoot from './pages/dashboard/DashboardRoot'
import RootAuth from './pages/auth/RootAuth'
import LoginPage from './pages/auth/LoginPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'
import PatientsPage,{loader as PatientsPageLoader} from './pages/dashboard/PatientsPage'

import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import Popup from './components/utility/Popup'

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
    <Fragment>
        <RouterProvider router={router} />
    </Fragment>
  )
}

export default App
