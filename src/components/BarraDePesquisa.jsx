import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const BarraDePesquisa = ({ searchKey }) => {
  const [buscar, setBuscar] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    setBuscar(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buscar.trim()) {
        setSearchParams({ search: buscar });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [buscar, setSearchParams]);

  useEffect(() => {
    setBuscar(""); 
  }, [searchKey]);

  return (
    <div className="form-control">
      <div className="input-group flex flex-row">
        <input
          type="text"
          placeholder="Buscar personagem..."
          className="input input-sm md:input-md input-bordered w-32 md:w-48 focus:w-40 md:focus:w-64 transition-all duration-300 bg-slate-800 text-white placeholder-gray-400 border-teal-400/50 focus:border-cyan-400 focus:outline-none"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
        <button
          className="btn btn-sm md:btn-md bg-green-500 border-green-300 hover:bg-green-200 text-white"
          onClick={() => setSearchParams({ search: buscar })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-6 md:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};