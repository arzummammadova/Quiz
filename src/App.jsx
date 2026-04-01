import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import NotFound from './pages/notfound/NotFound'
import Layout from './pages/layout/Layout/Layout'
import OvewViewPage from './pages/overview/OvewViewPage'

function App() {

  return (
    <>
    
    <Routes>

      <Route path="/" element={<Layout/>}>
        <Route index element={<OvewViewPage/>}/>
      </Route>
       <Route path='/login' element={<Login/>}/>  
      <Route path='/register' element={<Register/>}/>


   

      <Route path="*" element={<NotFound/>}/>

    

    </Routes>
    </>
  )
}

export default App
