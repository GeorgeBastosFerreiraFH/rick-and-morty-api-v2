import { useState } from "react";
import { ModalDetalhado } from "./ModalDetalhado";

export const CardPersonagem = ({ id, image, name, species, status, location }) => {
  const [estaAberto, setEstaAberto] = useState(false);

  // Função para determinar a cor do status
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div
        className="card bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] overflow-hidden border border-teal-400/20"
        onClick={() => setEstaAberto(true)}
      >
        <div className="relative">
          <figure className="w-full h-64 overflow-hidden">
            <img 
              src={image} 
              alt={`Imagem de ${name}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
            />
          </figure>
          <div className="absolute top-3 right-3">
            <div className={`px-3 py-1 rounded-full text-white text-xs font-bold flex items-center ${getStatusColor()}`}>
              <span className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse"></span>
              {status}
            </div>
          </div>
        </div>

        <div className="card-body p-5 text-white">
          <h2 className="card-title text-xl font-extrabold text-teal-400 truncate">{name}</h2>
          <div className="space-y-2 mt-2">
            <p className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-600 mr-2"></span>
              <span className="text-gray-300 font-medium">Espécie:</span> 
              <span className="ml-1 text-cyan-200 font-semibold">{species}</span>
            </p>
            <p className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-cyan-500 mr-2"></span>
              <span className="text-gray-300 font-medium">Localização:</span> 
              <span className="ml-1 text-cyan-200 font-semibold truncate">{location}</span>
            </p>
          </div>
          <div className="card-actions justify-end mt-2">
            <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition">
              Ver detalhes →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalDetalhado id={id} isOpen={estaAberto} onClose={() => setEstaAberto(false)} />
    </>
  );
};