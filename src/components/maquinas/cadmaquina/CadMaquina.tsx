// src/components/maquinas/cadmaquina/CadMaquina.tsx

import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import AuthContext from "../../../contexts/AuthContext";
import { getAllMachines } from "../../../services/Service";
import { Machine } from "../../../models/Machine";

function CadMaquina() {
  const { usuario } = useContext(AuthContext);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchMachines = async () => {
      if (usuario.token === "") {
        ToastAlerta("Você precisa estar logado", "info");
        return;
      }

      setLoading(true);
      try {
        const data = await getAllMachines(usuario.token); 
        setMachines(data);
      } catch (err) {
        setError("Erro ao buscar as máquinas. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [usuario.token]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredMachines = machines.filter(
    (machine) =>
      machine.name.toLowerCase().includes(filter.toLowerCase()) ||
      machine.ip.includes(filter),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          strokeColor="gray"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="block mx-auto border-b border-slate-300 max-w-[360px] mb-4">
        <a
          href="#"
          className="block w-full px-4 py-2 text-center text-slate-700 transition-all"
        >
          <b>CENTRAL DE CONTROLES</b>
        </a>
      </div>

      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between ">
            <div className="w-1/2">
              <label htmlFor="descricao">Filtrar:</label>
              <input
                type="text"
                placeholder="Filtrar por Nome ou IP"
                name="descricao"
                value={filter}
                onChange={handleFilterChange}
                className="border-2 border-slate-700 rounded p-2 m-4 w-2/3 h-2/3"
              />
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <button
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => setFilter("")}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-slate-200 bg-slate-50">
                  <p className="font-sans text-sm font-normal text-slate-500">
                    Máquina
                  </p>
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">
                  <p className="font-sans text-sm font-normal text-slate-500">
                    IP
                  </p>
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">
                  <p className="font-sans text-sm font-normal text-slate-500">
                    Estado
                  </p>
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">
                  <p className="font-sans text-sm font-normal text-slate-500">
                    Últimas Atualizações
                  </p>
                </th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">
                  <p className="font-sans text-sm font-normal text-slate-500">
                    Editar
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((machine) => (
                <tr key={machine.id}>
                  
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://ik.imagekit.io/o4h22lltho/RMM/computer-7498415_640.jpg?updatedAt=1729121741074"
                        alt={machine.name}
                        className="h-9 w-9 rounded-full object-cover object-center"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-700">
                          {machine.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          Host: {machine.name}{" "}
                          
                        </p>
                      </div>
                    </div>
                  </td>

                  
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700">
                        {machine.ip}
                      </p>
                    </div>
                  </td>

                 
                  <td className="p-4 border-b border-slate-200">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                          machine.status === "online"
                            ? "bg-green-500/20 text-green-900"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span>{machine.status}</span>
                      </div>
                    </div>
                  </td>

                 
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-sm text-slate-500">
                      {new Date(machine.lastUpdated).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="p-4 border-b border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20"
                      type="button"
                      onClick={() => {
                        
                        ToastAlerta(
                          "Funcionalidade de editar em desenvolvimento.",
                          "info",
                        );
                      }}
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredMachines.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500">
                    Nenhuma máquina encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-slate-500">Página 1 de 1</p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              disabled
            >
              Anterior
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              disabled
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadMaquina;
