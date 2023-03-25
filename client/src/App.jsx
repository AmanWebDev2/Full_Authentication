import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import all components */
import PageNotFound from './components/PageNotFound';
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Reset from './components/Reset';


/** root routes */
const router = createBrowserRouter([
  {
    path:'/',
    element:<Username />
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/recovery',
    element:<Recovery/>
  },
  {
    path:'/reset',
    element:<Reset/>
  },
  {
    path:'/password',
    element:<Password />
  },
  {
    path:'*',
    element:<PageNotFound/>
  },
])

function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
