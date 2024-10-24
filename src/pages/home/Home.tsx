import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsuarioLogin from '../../models/UsuarioLogin';
import AuthContext from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Home() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)


  useEffect(() => {
      if (usuario.token === "") {
          ToastAlerta('Você precisa estar logado', 'info')
          navigate("/")
      }
  }, [usuario.token])

  
  return (
    <>
    <div className="bg-indigo-900 flex justify-center p-5">
      <div className='container grid grid-cols-2 text-white'>
        <div className="flex flex-col gap-4 items-center justify-center py-4">
          <h2 className='text-5xl font-bold'>Seja bem vindo!</h2>
          <p className='text-xl text-center'>RMM controle de maquinas remotamente numa maneira rapida e pratica.</p>

          <div className="flex justify-around gap-4">
          
            <div className="flex justify-around gap-4">
            </div>
          </div>
        </div>

        <div className="flex justify-center ">
        <img src="https://ik.imagekit.io/o4h22lltho/RMM/img-home.jpg?updatedAt=1729008670027" alt="Imagem da Página Home"
          className="
            w-80 h-80 rounded-full
        "/>
  
        </div>
      </div>
    </div>
  </>
  )
}

export default Home