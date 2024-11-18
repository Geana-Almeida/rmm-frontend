import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import AuthContext from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
    const navigate = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  
    useEffect(() => {
        if(usuario.token !== ""){
            navigate("/home");
        }
    }, [usuario]);
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }
  
    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="hidden lg:flex justify-center items-center">
                <img 
                    src="https://ik.imagekit.io/o4h22lltho/RMM/computadores.jpg?updatedAt=1728316007439" 
                    alt="Computadores" 
                    className=" object-cover rounded-lg shadow-md"
                />
            </div>
            <form 
                onSubmit={login} 
                className="flex flex-col justify-center items-center w-full lg:w-2/3 p-8 space-y-6"
            >
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Entrar</h1>

                <div className="w-full">
                    <label htmlFor="usuario" className="block text-gray-600 mb-1">Usuário</label>
                    <input 
                        type="email" 
                        id="usuario"
                        name="username"
                        placeholder="Digite seu usuário"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"
                        value={usuarioLogin.username || ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="senha" className="block text-gray-600 mb-1">Senha</label>
                    <input 
                        type="password" 
                        id="senha"
                        name="password"
                        placeholder="Digite sua senha"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"
                        value={usuarioLogin.password || ''}
                        onChange={atualizarEstado}
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex justify-center items-center transition duration-300"
                >
                    {isLoading ? 
                        <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> 
                        : 
                        <span>Entrar</span>
                    }
                </button>

                <hr className="border-gray-300 w-full mt-6" />

                <p className="text-gray-700 text-center">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastrar" className="text-indigo-600 font-semibold hover:underline transition">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;