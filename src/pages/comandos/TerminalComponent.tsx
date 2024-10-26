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
    let [resposta, setResposta] = useState<String>("");

    useEffect(() => {
        if (!usuario || token === "") {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate("/");
        }
    }, [usuario.token]);
    

    const [commands, setCommands] = useState<Commands>({
        machine_id: "bd356735-8fbf-49aa-83b4-56a79e7d031e",
        action: "cmd: "
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCommands({
            ...commands,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate('/home');
    }

    async function enviarComando(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);

        console.log(token)
        try {
            const respostaRecebida = await CommandsService('/send-command', commands, setCommands,{
                headers: {
                    Authorization: token,
                },
            });
            
            setResposta(respostaRecebida);
            ToastAlerta('Comando enviado com sucesso!', 'sucesso');
        } catch (error: any) {
            console.log(error)
            ToastAlerta('Erro ao enviar comando!', 'erro');
        }
        setIsLoading(false);
    }

    return (
        <div className='items-center justify-center'>
            <form onSubmit={enviarComando} className='flex items-center flex-col  gap-3'>
                <h1 className='text-slate-900 text-5xl'>Enviar Comando</h1>
            <div className="flex flex-col w-2/3">
                <input
                    type="text"
                    id="action"
                    name="action"
                    placeholder="action"
                    className="border-2 border-slate-700 rounded p-2"
                    value={commands.action}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
            </div>
            <div className='flex justify-around w-full gap-8 text-white'>
                <button className='bg-red-400 rounded py-2 hover:bg-red-700 w-1/4' type="button" onClick={retornar}>
                    Voltar
                </button>
                <button 
                    className='bg-blue-400 rounded py-2 hover:bg-blue-700 w-1/4 flex justify-center' 
                    type='submit'
                >
                    {isLoading ? 
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Enviar Comando</span>
                    }
                </button>
            </div>
            <a href="../"></a>
        </form>
            <div className='flex bg-slate-950 text-white items-center justify-center'>
                <p className='w-2/4'>{`${resposta}`}</p>
            </div>
        </div> 
    );
}

export default TerminalComponent;



