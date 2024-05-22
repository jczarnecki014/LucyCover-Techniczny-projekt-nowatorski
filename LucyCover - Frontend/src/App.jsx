import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import {QueryClientProvider} from '@tanstack/react-query'
import { queryClient } from './api/https'

import DashboardRoot from './pages/dashboard/DashboardRoot'
import RootAuth from './pages/auth/RootAuth'
import LoginPage from './pages/auth/LoginPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'
import PatientsPage,{loader as PatientsPageLoader} from './pages/dashboard/PatientsPage'
import PatientMenuPage, {loader as PatientMenuLoader} from './pages/dashboard/PatientMenuPage'
import PatientDocumentationPage,{loader as PatientDocumentationLoader} from './pages/dashboard/PatientDocumentationPage'
import PatientRecommendationPage,{loader as PatientRecommendationLoader} from './pages/dashboard/PatientRecommendationPage'
import PatientDocumentationDisplayPage,{loader as PatientDocumentationDisplayLoader} from './pages/dashboard/PatientDocumentationDisplayPage'
import PatientDocumentationEdit from './pages/dashboard/PatientDocumentationEdit'
import PatientRecommendationDisplayPage,{loader as PatientRecommendationDisplayLoader} from './pages/dashboard/PatientRecommendationDisplayPage'
import PatientSchedulePage, {loader as PatientSchedulePageLoader} from './pages/dashboard/PatientShedulePage'

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
                    children:[
                      {
                        index: true,
                        loader: PatientDocumentationLoader,
                        element: <PatientDocumentationPage />
                      },
                      {
                        path: ':documentationId',
                        children:[
                          {
                            index: true,
                            loader: PatientDocumentationDisplayLoader,
                            element: <PatientDocumentationDisplayPage />
                          },
                          {
                            path: 'edit',
                            element: <PatientDocumentationEdit />
                          },
                        ]
                      }
                    ]
                  },
                  {
                    path: 'recommendation',
                    children:[
                      {
                        index: true,
                        loader: PatientRecommendationLoader,
                        element: <PatientRecommendationPage />
                      },
                      {
                        path: ':recommendationId',
                        loader: PatientRecommendationDisplayLoader,
                        element: <PatientRecommendationDisplayPage />
                      },
                    ]
                  },
                  {
                    path: 'schedule',
                    loader: PatientSchedulePageLoader,
                    element: <PatientSchedulePage />,
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
      },
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
