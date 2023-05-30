import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import SingupPage from './Pages/LoginPage/SingupPage'


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LoginPage/>}/>
        <Route path='/cadastro' element={<SingupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
