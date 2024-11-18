import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    <div className="flex flex-col items-center max-w-full">
        <h1 className='text-slate-700 size-20 font-bold w-full flex items-center justify-center'>Comando que podem ser utilizados na Central de Controles</h1>
        <table className='py-14  min-w-full '>
          <thead className="bg-gray-200 border-b">
            <tr className=''>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left  ">
                #
              </th>
              <th scope="col" className="flex justify-center text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Comandos
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ipconfig
              </td>

            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ping
              </td>

            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                dir
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              tasklist
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              systeminfo
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6</td>
              <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              arp -a
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </>
  )
}

export default Home