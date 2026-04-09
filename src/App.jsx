import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import NotFound from './pages/notfound/NotFound'
import Layout from './pages/layout/Layout/Layout'
import OvewViewPage from './pages/overview/OvewViewPage'
import VerifyEmail from './pages/verify-email/VerifyEmail'
import Profile from './pages/profile/Profile'
import CategoriesPage from './pages/Categories/CategoriesPage'
import QuizPage from './pages/quiz/QuizPage'

function App() {

  return (
    <>

      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<OvewViewPage />} />
          <Route path="/quiz/:category" element={<CategoriesPage />} />
          <Route path="/quiz/questions" element={<QuizPage />} />
          {/* <Route path="/quiz/questions?category=:category&topic=:topic" element={<QuizPage />} /> */}
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        <Route path="/profile" element={<Profile />} />




        <Route path="*" element={<NotFound />} />



      </Routes>
    </>
  )
}

export default App
