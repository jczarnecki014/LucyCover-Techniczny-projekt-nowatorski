import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import HomePage from './pages/HomePage'
import RootAuth from './pages/auth/RootAuth'

const router = createBrowserRouter([
  {
    path: '/',
    //RootPage
    //ErrorPage
    children:[
      {index:true, element: <HomePage />},
      {
        path: 'auth',
        element: <RootAuth />
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
