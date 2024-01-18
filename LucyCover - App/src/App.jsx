import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import HomePage from './pages/HomePage'
import RootAuthElement from './pages/auth/RootAuthElement'

const router = createBrowserRouter([
  {
    path: '/',
    //RootPage
    //ErrorPage
    children:[
      {index:true, element: <HomePage />},
      {
        path: 'auth',
        element: <RootAuthElement />
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
