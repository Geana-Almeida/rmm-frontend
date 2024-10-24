import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlerta';
import Usuario from '../../models/Usuario';
import { createUser } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {

  const navigate = useNavigate();

  //Estado que vai guardar os dados do meu usuário
  const [username, setUsuario] = useState<Usuario>({
    name: "",
    username: "",
    password: ""
  })

  //Estado que vai guarda a confirmação da senha
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  //Estado que vai indicar quando a animação (loader) será carregada
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redireciona para o Componente Login (rota /login)

  function retornar(){
    navigate('/login')
  }

  //Funcao que atualiza as propriedades do Estado Usuário
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...username,
      [e.target.name] : e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if(confirmaSenha === username.password && username.password.length >= 8){
      setIsLoading(true)

      try{
        
        await createUser('/auth/register', username, setUsuario)
        ToastAlerta("Usuário cadastrado com Sucesso!", 'sucesso')

      }catch(error){
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
      }
    }

    else{
      ToastAlerta("Dados inconsistentes! Verifique as informações do Cadastro.", 'info')
      setUsuario({...username, password: ""})
      setConfirmaSenha("")
    }
    setIsLoading(false)
  }

  
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className=''>
                <img src="https://ik.imagekit.io/o4h22lltho/RMM/mulher.png?updatedAt=1728837097267" alt="" />
        </div>
        
        <form onSubmit={cadastrarNovoUsuario} className='flex justify-center items-center flex-col w-2/3 gap-3'>
          <h1 className='text-slate-900 text-5xl'>Cadastrar</h1>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={username.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input 
              type="email" 
              id='usuario'
              name='username'
              placeholder='Usuario'
              className='border-2 border-slate-700 rounded p-2'
              value={username.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id='senha'
              name='password'
              placeholder='Senha'
              className='border-2 border-slate-700 rounded p-2'  
              value={username.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor="confirmar_senha">Confirmar Senha</label>
            <input 
              type="password" 
              id='confirmar_senha'
              name='confirmar_senha'
              placeholder='Confirmar Senha'
              className='border-2 border-slate-700 rounded p-2'  
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className='flex justify-around w-full gap-8 text-white'>
            <button className='bg-red-400 rounded py-2 hover:bg-red-700 w-1/2' onClick={retornar}>
                Cancelar
            </button>
            <button 
            className=' bg-blue-400 rounded py-2 hover:bg-blue-700 w-1/2 flex justify-center' 
            type='submit'
            >
                {isLoading ? 
                <RotatingLines
                strokeColor="white"
                strokeWidth = "5"
                animationDuration="0.75"
                width="24"
                visible={true}
                /> :
                <span>Cadastrar</span>}
                
            </button>
          </div>
          
          <a href="../"></a>
        </form>
      </div>

  )
}

export default Cadastro