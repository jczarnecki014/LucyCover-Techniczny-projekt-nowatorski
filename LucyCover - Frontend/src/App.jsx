import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import DashboardRoot from './pages/dashboard/DashboardRoot'
import RootAuth from './pages/auth/RootAuth'
import LoginPage from './pages/auth/LoginPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'
import PatientsPage,{loader as PatientsPageLoader} from './pages/dashboard/PatientsPage'
import PatientMenuPage, {loader as PatientMenuLoader} from './pages/dashboard/PatientMenuPage'
import PatientDocumentationPage,{loader as PatientDocumentationLoader} from './pages/dashboard/PatientDocumentationPage'
import PatientRecommendationpage,{loader as PatientRecommendationLoader} from './pages/dashboard/PatientRecommendationpage'

import { Fragment } from 'react'

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
            children: [
              {
                index: true,
                loader: PatientsPageLoader,
                element: <PatientsPage />,
              },
              {
                path: ':patientId',
                children: [
                  {
                    index:true,
                    loader: PatientMenuLoader,
                    element: <PatientMenuPage />
                  },
                  {
                    path: 'documentation',
                    loader: PatientDocumentationLoader,
                    element: <PatientDocumentationPage />
                  },
                  {
                    path: 'recommendation',
                    loader: PatientRecommendationLoader,
                    element: <PatientRecommendationpage />
                  }
                ]
              },
            ]
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
