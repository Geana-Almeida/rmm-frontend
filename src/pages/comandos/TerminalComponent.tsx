import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Commands from '../../models/commands';
import AuthContext from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { CommandsService } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function TerminalComponent() {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);
    const token = "Bearer " + usuario.token;
    const [resposta, setResposta] = useState<String>("");
    const [commands, setCommands] = useState<Commands>({
        machine_id: "bd356735-8fbf-49aa-83b4-56a79e7d031e",
        action: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!usuario || token === "") {
            ToastAlerta('VocÃª precisa estar logado', 'info');
            navigate("/");
        }
    }, [usuario.token]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCommands({
            ...commands,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate('/home');
    }

    async function enviarComando(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const respostaRecebida = await CommandsService('/send-command', commands, setCommands, {
                headers: { Authorization: token },
            });
            setResposta(respostaRecebida);
            ToastAlerta('Comando enviado com sucesso!', 'sucesso');
        } catch (error: any) {
            ToastAlerta('Erro ao enviar comando!', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
            <form onSubmit={enviarComando} className="flex flex-col items-center w-full max-w-md bg-white rounded-lg shadow-lg p-6 gap-6">
                <h1 className="text-2xl font-semibold text-gray-800">Enviar Comando</h1>
                <input
                    type="text"
                    id="action"
                    name="action"
                    placeholder="Insira o comando"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition"
                    value={commands.action}
                    onChange={atualizarEstado}
                />
                <div className="flex justify-between w-full">
                    <button 
                        type="button" 
                        onClick={retornar} 
                        className="w-1/3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                    >
                        Voltar
                    </button>
                    <button 
                        type="submit" 
                        className="w-1/3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition"
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            "Enviar"
                        )}
                    </button>
                </div>
            </form>
            <div className="mt-6 w-full max-w-md bg-gray-800 text-white rounded-lg p-4">
                <p className="text-center text-sm">{resposta || "Nenhuma resposta recebida."}</p>
            </div>
        </div>
    );
}

export default TerminalComponent;