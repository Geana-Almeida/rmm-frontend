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