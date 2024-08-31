import React from 'react'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUP'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path : "/" ,
    element : <Home/>, 
  },
  {
    path :  "/signIn" ,
    element : <SignIn/>
  },
  {
    path :  "/signUp" ,
    element : <SignUP/>
  },
  {
    path :  "/project" ,
    element : <Project/>
  },
  {
    path :  "/dashboard" ,
    element : <Dashboard/>
  },
  {
    path :  "/about" ,
    element : <About/>
  },
])

const App = () => {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App