/////////////////// pages /////////////////////////////////
import DashboardRoot from './pages/dashboard/DashboardRoot'
import PatientsPage,{loader as PatientsPageLoader} from './pages/dashboard/PatientsPage'
import PatientMenuPage, {loader as PatientMenuLoader} from './pages/dashboard/PatientMenuPage'
import PatientDocumentationPage,{loader as PatientDocumentationLoader} from './pages/dashboard/PatientDocumentationPage'
import PatientRecommendationPage,{loader as PatientRecommendationLoader} from './pages/dashboard/PatientRecommendationPage'
import PatientDocumentationDisplayPage,{loader as PatientDocumentationDisplayLoader} from './pages/dashboard/PatientDocumentationDisplayPage'
import PatientRecommendationDisplayPage,{loader as PatientRecommendationDisplayLoader} from './pages/dashboard/PatientRecommendationDisplayPage'
import PatientSchedulePage, {loader as PatientSchedulePageLoader} from './pages/dashboard/PatientShedulePage'
import EducationalMaterialsPage,{loader as EducationMaterialsPageLoader} from './pages/dashboard/EducationalMaterialsPage'
import SchedulePage from './pages/dashboard/SchedulePage'
import MessagesPage,{loader as MessagesPageLoader} from './pages/dashboard/MessagesPage'
import AuthPage from './pages/auth/AuthPage'
import ErrorPage from './pages/ErrorPage'
//////////////// hooks //////////////////////////////////
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom'
import {QueryClientProvider} from '@tanstack/react-query'
import { queryClient } from './api/https'



const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children:[
      {
        index: true,
        element: <Navigate to="/dashboard/schedule" replace />
      },
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
          {
            path: 'education',
            element: <EducationalMaterialsPage />,
            loader: EducationMaterialsPageLoader
          },
          {
            path: 'schedule',
            element: <SchedulePage />
          },
          {
            path: 'messages',
            element: <MessagesPage />,
            loader: MessagesPageLoader
          },
        ]
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
    ]
  }
])

/**
 * App component - supply page router and tanstackQuery configuration
 *
 * @component
 */

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
