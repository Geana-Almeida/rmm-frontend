import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { getAllMachines } from "../../../services/Service";
import { Machine } from "../../../models/Machine";
import { TerminalWindow } from "@phosphor-icons/react";

function CadMaquina() {
  const navigate = useNavigate();

  const { usuario } = useContext<any>(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }

    getMachines();
  }, [usuario.token]);

  

  const [machines, setMachines] = useState<Machine[]>([]);

  const getMachines = async () => {
     try{ 
      const data = await getAllMachines(usuario.token);
      
      console.log(data)
      setMachines(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="max-w">
      <div className="block mx-auto border-b border-slate-300 max-w-[360px]">
        <a
          target="_blank"
          href="https://www.material-tailwind.com/docs/html/table"
          className="block w-full px-4 py-2 text-center text-slate-700 transition-all "
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
                placeholder="Filtrar"
                name="descricao"
                className="border-2 border-slate-700 rounded p-2 m-4 w-2/3 h-2/3"
              />
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <button
                onClick={getMachines}
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Visualizar todos
              </button>
            </div>
          </div>
        </div>
        <div className="p-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    Maquinas
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    IP
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Estado
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Ultimas atualizações
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Enviar Comando
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine.id}>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://ik.imagekit.io/o4h22lltho/RMM/computer-7498415_640.jpg?updatedAt=1729121741074"
                        alt="Alexa Liras"
                        className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-700">
                          Windows
                        </p>
                        <p className="text-sm text-slate-500">
                          Host: {machine.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700">
                        {machine.ip_address}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="w-max">
                      <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-slate-100 text-slate-500">
                        <span>{machine.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-sm text-slate-500">
                      {formatDate(machine.created_at)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    
                    <Link to='/terminal'
                      className="relative flex items-center justify-center h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button">
                      <TerminalWindow size={32} />
                    </Link>
                  </td>
                </tr>
              ))}

              <tr>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://ik.imagekit.io/o4h22lltho/RMM/computer-7498415_640.jpg?updatedAt=1729121741074"
                      alt="Laurent Perrier"
                      className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700">
                        Linux
                      </p>
                      <p className="text-sm text-slate-500">
                        Host: Laurent Perrier
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-700">
                      0.0.0.0
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="w-max">
                    <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-slate-100 text-slate-500">
                      <span className="">offline</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="text-sm text-slate-500">10/09/24</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <Link to='/terminal'
                      className="relative flex items-center justify-center h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button">
                      <TerminalWindow size={32} />
                    </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-slate-500">Página 1 de 10</p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Anterior
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Proxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadMaquina;
