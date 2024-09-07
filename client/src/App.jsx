import React from 'react'
import {createBrowserRouter , Outlet, RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUP'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = () =>{
  return (
    <div className='w-screen flex flex-col h-screen box-border '>
<div className='sticky top-0 z-10 '>
<Header/>
</div>
    <div className='mb-auto z-0'>
    <Outlet/>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  )
}
const router = createBrowserRouter([
  {
    element : <Layout/>,
    children : [

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
    ]
  }
])


const App = () => {
  return (
    <>
    
    <RouterProvider router={router}>

    </RouterProvider>
    </>
  )
}

export default App