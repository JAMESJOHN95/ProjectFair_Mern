import { Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Projects from './Pages/Project'
import Dashbord from './Pages/Dashbord'
import Authentication from './Pages/Authentication'
import Footer from './Componants/Footer'
import { useContext } from 'react'

import { tokenAuthenticationConfig } from './Contexts/TokenAuthentication'

function App() {
  const {isAuthorisation,setIsAuthorisation} = useContext(tokenAuthenticationConfig)

  return (
    <>
   <Routes>
    <Route path='/' element = {<Home/>}/>
    <Route path='/login' element = {<Authentication/>}/>
    <Route path='/register' element = {<Authentication insideregister/>}/>
    <Route path='/Dashbord' element = {isAuthorisation?<Dashbord/>: <Navigate to ={'/login'}/>}/>
    <Route path='/Projects' element = {isAuthorisation?<Projects/>: <Navigate to ={'/login'}/>}/>
    <Route path='/*' element = {<Navigate to= {'/'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
