import { createContext, ReactNode, useEffect, useState } from "react"
import UsuarioLogin from "../models/UsuarioLogin"
import React from 'react';
import { ToastAlerta } from "../utils/ToastAlerta"
import { authenticateUser } from "../services/Service"


interface AuthContextProps{
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): Promise<void>
    handleLogout(): void
    isLoading: boolean
}

interface AuthProviderProps{
    children: ReactNode
}

//Crria uma nova instância da API Context
export const AuthContext = createContext({} as AuthContextProps)

//Cria o Provedor
export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: "",
        name: "",
        password: "",
        token: "",
        username: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin){
        setIsLoading(true)
        try {
            await authenticateUser(`/auth/login`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso")
        } catch (error) {
            console.log(error)
            ToastAlerta("Os dados do usuário estão incosistentes!", "erro")
        }

        setIsLoading(false)

    }

    function handleLogout(){
        setUsuario({
            id: "",
            name: "",
            password: "",
            token: "",
            username: ""
        })
    }

    return (
        // Renderizando a context na aplicação React
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext