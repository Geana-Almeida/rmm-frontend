import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import AuthContext from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
    const navigate = useNavigate()

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
      {} as UsuarioLogin
    );
  
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  
    useEffect(() => {
      if(usuario.token !== ""){
        navigate("/home");
      }
    }, [usuario])
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
        ...usuarioLogin,
        [e.target.name]: e.target.value
        })
    }
  
    function login(e: ChangeEvent<HTMLFormElement>){
      e.preventDefault()
  
      handleLogin(usuarioLogin)
    }
  


  return (
    
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
            <div className=''>
                <img src="https://ik.imagekit.io/o4h22lltho/RMM/computadores.jpg?updatedAt=1728316007439" alt="" />
            </div>
            <form onSubmit={login} className='flex justify-center items-center flex-col w-2/3 gap-3'>
                <h1 className='text-slate-900 text-5xl'>Entrar</h1>

                <div className="flex flex-col w-full items-start">
                    <label htmlFor="usuario" className='p-2'>Usuario</label>
                    <input 
                        type="email" 
                        id='usuario'
                        name='username'
                        placeholder='Usuario'
                        className='border-2 border-slate-700 rounded p-2 w-full'
                        value={usuarioLogin.usuario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>



                <div className='flex flex-col w-full items-start'>
                    <label htmlFor="senha" className='p-2'>Senha</label>
                    <input 
                        type="password" 
                        id='senha'
                        name='password'
                        placeholder='Senha'
                        className='border-2 border-slate-700 rounded p-2 w-full'  
                        value={usuarioLogin.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>


                <div className='flex justify-around w-full gap-8 text-white'>
                <button className='bg-blue-400 rounded py-2 hover:bg-blue-700 w-1/2 flex justify-center' type='submit'>
                    {isLoading ? 
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                    />:
                    <span>Entrar</span>}
                </button>
                </div>

                <hr className='border-slate-800 w-full'/>
                <p className='flex flex-col'>
                ainda não tem uma conta?
                <Link to='/cadastrar' className='font-bold text-indigo-800 hover:underline text-center'>Cadastre-se</Link>
        </p>
            </form>
    </div>
 
  )
}

export default Login