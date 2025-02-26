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
      </div>
    </div>
  );
};
