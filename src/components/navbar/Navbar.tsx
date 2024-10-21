import React, { ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';

function Navbar() {
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ("O usuário foi desconectado com sucesso!");
        navigate("/login");
    }

    let component: ReactNode;

    if(usuario.token !== ''){
        component = (
            <div className="w-full flex justify-center py-4
            bg-indigo-900 text-white">
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-bold'>RMM</Link>
                    <div className="flex">    
                        <div className="flex">
                            <p className="mr-5">
                            <Link to='/home' className='hover:underline'>Home</Link>
                            </p>
                            <p className="mr-5">
                            <Link to='/perfil' className="hover:underline">Perfil</Link>
                            </p>
                            <p className="mr-5">
                            <Link to='/centralcontrole' className="hover:underline">Central de controle</Link>
                            </p>
                            <p className="mr-5">
                            <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



  return (
    <>
        { component }
    </>
  )
}

export default Navbar