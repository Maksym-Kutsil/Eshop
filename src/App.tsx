import './App.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './Layout/Layout'
const Home = lazy(() => import("./pages/Home/Home"))
const About = lazy(() => import("./pages/About/About"))
const SignUp = lazy(() => import("./pages/SignUp/SignUp"))
const Login = lazy(() => import("./pages/Login/Login"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />}/>
            <Route path='about/:id' element={<About />}/>
          </Route>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
