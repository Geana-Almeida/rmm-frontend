import axios from "axios";
import { Machine } from "../models/Machine";

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

export const getAllMachines = async (token: string): Promise<Machine[]> => {
    const response = await api.get('/machines', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
}

export const getActiveMachines = async (token: string): Promise<Machine[]> => {
    const response = await api.get('/machines/active', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
}

export const getMachineById = async (id: string, token: string): Promise<Machine> => {
    const response = await api.get(`/machines/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
}