import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import { ToastContainer } from 'react-toastify'

import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Cadastro from './pages/cadastro/Cadastro';
import Navbar from './components/navbar/Navbar';
import CadMaquina from './components/maquinas/cadmaquina/CadMaquina';
import TerminalComponent from './pages/comandos/TerminalComponent';


function App() {
 

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element = {<Login/>}/>
            <Route path="/cadastrar" element = {<Cadastro/>}/>
            <Route path="/centralcontrole" element = {<CadMaquina/>}/>
            <Route path="/terminal" element = {<TerminalComponent/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
