import { useState, useEffect } from "react";
import { getPersonagemById } from "../services/api";

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * 19) + 1;
  return `/${randomIndex}.jpg`;
};

export const CardLocalizao = ({id, name, type, dimension, residents }) => {
  const [residentImages, setResidentImages] = useState([]);
  const [randomImage, setRandomImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRandomImage(getRandomImage());

    const fetchResidents = async () => {
      try {
        const residentIds = residents.map(url => url.split("/").pop());
        const images = await Promise.all(
          residentIds.map(async (residentId) => {
            const personagem = await getPersonagemById(residentId);
            return personagem ? personagem.image : null;
          })
        );

        setResidentImages(images.filter(img => img !== null));
      } catch (error) {
        console.error("Erro ao buscar imagens dos residentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [residents]);

  return (
    <div
      className="card bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] overflow-hidden border border-teal-400/20"
    >
      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
            </div>
          </div>
        ) : (
          <figure className="w-full h-64 overflow-hidden">
            <img 
              src={randomImage} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
            />
          </figure>
        )}
      </div>

      <div className="card-body p-5 text-white">
        <h2 className="card-title text-xl font-extrabold text-teal-400 truncate">{name}</h2>
        <div className="space-y-2 mt-2">
          <p className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-600 mr-2"></span>
            <span className="text-gray-300 font-medium">Tipo:</span> 
            <span className="ml-1 text-cyan-200 font-semibold">{type}</span>
          </p>
          <p className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-cyan-500 mr-2"></span>
            <span className="text-gray-300 font-medium">Dimensão:</span> 
            <span className="ml-1 text-cyan-200 font-semibold truncate">{dimension}</span>
          </p>

          {/* Seção de imagens dos residentes */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 rounded-lg border border-teal-400/30">
            <p className="text-xs text-teal-400 uppercase font-bold mb-2">Residentes</p>
            <div className="flex flex-wrap gap-2">
              {residentImages.length > 0 ? (
                residentImages.slice(0, 10).map((img, index) => (
                  <img key={index} src={img} alt="Residente" className="w-10 h-10 rounded-full border border-teal-300 shadow-sm" />
                ))
              ) : (
                <p className="text-gray-400 text-sm">Não há um ser vivo nesse planeta.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
