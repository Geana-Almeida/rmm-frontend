import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlerta';
import Usuario from '../../models/Usuario';
import { createUser } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {
  const navigate = useNavigate();
  const [username, setUsuario] = useState<Usuario>({
    name: "",
    username: "",
    password: ""
  });
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...username,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if(confirmaSenha === username.password && username.password.length >= 8){
      setIsLoading(true);

      try {
        await createUser('/auth/register', username, setUsuario);
        ToastAlerta("Usuário cadastrado com Sucesso!", 'sucesso');
      } catch(error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro');
      }
    } else {
      ToastAlerta("Dados inconsistentes! Verifique as informações do Cadastro.", 'info');
      setUsuario({...username, password: ""});
      setConfirmaSenha("");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex w-2/4 justify-center items-center p-8 bg-indigo-100">
        <img 
          src="https://ik.imagekit.io/o4h22lltho/RMM/mulher.png?updatedAt=1728837097267" 
          alt="Ilustração de Cadastro" 
          className="max-w-md h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <form 
          onSubmit={cadastrarNovoUsuario} 
          className="flex flex-col justify-center items-center w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
        >
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">Cadastrar</h1>

          <div className="w-full">
            <label htmlFor="name" className="block text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"
              value={username.name}
              onChange={atualizarEstado}
            />
          </div>

          <div className="w-full">
            <label htmlFor="usuario" className="block text-gray-600 mb-1">Usuário</label>
            <input 
              type="email" 
              id="usuario"
              name="username"
              placeholder="Usuário"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"
              value={username.username}
              onChange={atualizarEstado}
            />
          </div>

          <div className="w-full">
            <label htmlFor="senha" className="block text-gray-600 mb-1">Senha</label>
            <input 
              type="password" 
              id="senha"
              name="password"
              placeholder="Senha"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"  
              value={username.password}
              onChange={atualizarEstado}
            />
            <p className="text-xs text-gray-500 mt-1">
              A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial.
            </p>
          </div>

          <div className="w-full">
            <label htmlFor="confirmar_senha" className="block text-gray-600 mb-1">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmar_senha"
              name="confirmar_senha"
              placeholder="Confirmar Senha"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
            />
          </div>

          <div className="flex w-full gap-4 mt-4">
            <button 
              className="w-1/2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="w-1/2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex justify-center items-center transition duration-300"
            >
              {isLoading ? 
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                /> 
                : 
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
