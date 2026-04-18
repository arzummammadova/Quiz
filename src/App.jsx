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
import AboutPage from './pages/about/AboutPage'
import CheckAuth from './helpers/checkAuth'

function App() {

  return (
    <>

      <Routes>

        <Route path="/"  element={<CheckAuth><Layout /></CheckAuth>}>
          <Route index element={<OvewViewPage />} />
          <Route path="/quiz/:category" element={<CategoriesPage />} />
          <Route path="/quiz/questions" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/quiz/questions?category=:category&topic=:topic" element={<QuizPage />} /> */}
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        <Route path="/profile" element={<CheckAuth><Profile /></CheckAuth>} />




        <Route path="*" element={<NotFound />} />



      </Routes>
    </>
  )
}

export default App
