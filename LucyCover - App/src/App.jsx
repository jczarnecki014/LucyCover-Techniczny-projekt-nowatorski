import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import HomePage from './pages/HomePage'
import RootAuth from './pages/auth/RootAuth'
import LoginPage from './pages/auth/LoginPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'

const router = createBrowserRouter([
  {
    path: '/',
    //RootPage
    //ErrorPage
    children:[
      {index:true, element: <HomePage />},
      {
        path: 'auth',
        element: <RootAuth />,
        children:[
          {index:true, element: <LoginPage />},
          {
            path:'create-account', 
            element: <CreateAccountPage />}
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
