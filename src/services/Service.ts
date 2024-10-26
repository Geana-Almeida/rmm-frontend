import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4000',   
});

export const authenticateUser = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const createUser = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const CommandsService = async (url: string, dados: any, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    const responseData = resposta.data.response; // ajuste conforme a estrutura da sua resposta
    return resposta.data.response;
}