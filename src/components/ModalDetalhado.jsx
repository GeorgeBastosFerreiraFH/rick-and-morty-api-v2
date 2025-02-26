import { useEffect, useState } from "react";
import { getPersonagemById } from "../services/api";

export const ModalDetalhado = ({ id, isOpen, onClose }) => {
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && id) {
      setLoading(true);
      getPersonagemById(id)
        .then((data) => setPersonagem(data))
        .finally(() => setLoading(false));
    }
  }, [isOpen, id]);

  // Função para determinar a cor do status
  const getStatusColor = (status) => {
    if (!status) return "";
    
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "dead":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  // Função para mostrar o ícone do gênero
  const getGenderIcon = (gender) => {
    if (!gender) return "";
    
    switch (gender.toLowerCase()) {
      case "male":
        return "♂";
      case "female":
        return "♀";
      case "genderless":
        return "⚪";
      default:
        return "?";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.4)] p-6 relative w-full max-w-md mx-4 border border-teal-400/30 transform transition-all duration-300 animate-fadeIn" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar */}
        <button 
          aria-label="Fechar modal" 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-purple-300 text-white hover:bg-purple-800 transition-colors z-10" 
          onClick={onClose}
        >
          ✖
        </button>
        
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : personagem ? (
          <>
            {/* Cabeçalho com nome e imagem */}
            <div className="relative mb-5">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={personagem.image} 
                  alt={personagem.name} 
                  className="w-full h-72 object-cover" 
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">{personagem.name}</h2>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <div className={`px-4 py-1 rounded-full text-white font-medium flex items-center shadow-lg ${getStatusColor(personagem.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                  {personagem.status}
                </div>
              </div>
            </div>
            
            {/* Informações do personagem */}
            <div className="space-y-4 text-white">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 p-3 rounded-lg border border-cyan-500/20">
                  <p className="text-xs text-cyan-400 uppercase font-bold mb-1">Espécie</p>
                  <p className="font-semibold text-lg">{personagem.species}</p>
                </div>
                
                <div className="bg-black/30 p-3 rounded-lg border border-purple-500/20">
                  <p className="text-xs text-purple-400 uppercase font-bold mb-1">Gênero</p>
                  <p className="font-semibold text-lg flex items-center">
                    <span className="mr-2 text-xl text-purple-400">{getGenderIcon(personagem.gender)}</span>
                    {personagem.gender}
                  </p>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-teal-500/20">
                <p className="text-xs text-teal-400 uppercase font-bold mb-1">Origem</p>
                <p className="font-semibold">{personagem.origin.name}</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                <p className="text-xs text-cyan-400 uppercase font-bold mb-1">Localização Atual</p>
                <p className="font-semibold">{personagem.location.name}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 rounded-lg flex items-center justify-between border border-teal-400/30">
                <div>
                  <p className="text-xs text-teal-400 uppercase font-bold mb-1">Total de Episódios</p>
                  <p className="font-bold text-lg">{personagem.episode.length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {personagem.episode.length}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <p className="text-teal-400">Carregando informações...</p>
          </div>
        )}
      </div>
    </div>
  );
};