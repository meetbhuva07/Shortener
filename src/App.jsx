import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/App-Layout'
import LandingPage from './Pages/landing'
import Dashboard from './Pages/dashboard'
import Auth from './Pages/auth'
import Link from './Pages/link'
import RedirectLink from './Pages/redircet-link'
 
const router = createBrowserRouter([
  {
  element : <AppLayout />,
  children:[
    {
      path:'/',
      element:<LandingPage />
    },
    {
      path:'/dashboard',
      element:<Dashboard />
    },
    {
      path:'/auth',
      element:<Auth />
    },
    {
      path:'/link/:id',
      element:<Link />
    },
    {
      path:'/:id',
      element:<RedirectLink />
    },
  ]
}])
function App() {

  return <RouterProvider router={router} />
}

export default App
