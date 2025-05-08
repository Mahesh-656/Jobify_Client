import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomeLayout,Landing,Login,Register,Error,DashboardLayout,
  AddJob,
  Admin,
  AllJob,
  EditJob,
  DeleteJob,
  Profile,
  Stats,
} from './pages'

import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { action as addJobAction } from './pages/AddJob'
import { loader as allJobLoader } from './pages/AllJob'
import { loader as editJobLoader } from './pages/EditJob'
import { action as editJobAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import {loader as statsLoader} from './pages/Stats'

export const defaultTheme=()=>{
  const isDarkTheme=localStorage.getItem('dark-theme')==='true';
   document.body.classList.toggle('dark-theme',isDarkTheme);
   return isDarkTheme;
}
defaultTheme();

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
  {
    path:'login',
    element: <Login />,
    action:loginAction,
  },
  {
    path:'register',
    element: <Register />,
    action:registerAction,
  },
  {
    path:'dashboard',
    element: <DashboardLayout />,
    loader:dashboardLoader,
    children:[
      {
          index:true,
        element: <AddJob />,
        action:addJobAction,
      },
      {
       path:"delete-job/:id",
      element:<DeleteJob />,
        action: deleteJobAction
      },
      {
         path:'stats',
         element:<Stats/>,
         loader:statsLoader
      },
      {
  path: 'edit-job/:id',
  element: <EditJob />,
  loader: editJobLoader,
  action: editJobAction,
},
       {
         path:'all-jobs',
         element: <AllJob />,
         loader:allJobLoader
      },
       {
         path:'profile',
         element:<Profile/>
      },
       {
         path:'admin',
         element: <Admin />,
         loader:adminLoader,
      },
    ]
  }
]
  },

])
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App