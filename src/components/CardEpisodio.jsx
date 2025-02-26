import { useEffect, useState } from 'react';
import { getPersonagemById } from "../services/api";

export const CardEpisodio = ({id, name, air_date, episode, characters}) => {
    const [charactersImagem, setCharactersImagem] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
              const charactersIds = characters.map(url => url.split("/").pop());
              const images = await Promise.all(
                charactersIds.map(async (charactersId) => {
                  const characters = await getPersonagemById(charactersId);
                  return characters ? characters.image : null;
                })
              );
          
              setCharactersImagem(images.filter(img => img !== null));
            } catch (error) {
              console.error("Erro ao buscar imagens dos personagens:", error);
            } finally {
              setLoading(false);
            }
          }
          fetchCharacters();
    }, [characters]);

    return (
        <>
            {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="relative">
                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
                </div>
            </div>
            ) : (
            <div
            className="card bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] overflow-hidden border border-teal-400/20"
            >

                <div className="card-body p-5 text-white">
                        <h2 className="card-title text-xl font-extrabold text-teal-400 truncate">{name}</h2>
                        <div className="space-y-2 mt-2">
                        <p className="flex items-center">
                            <span className="inline-block w-3 h-3 rounded-full bg-cyan-500 mr-2"></span>
                            <span className="text-gray-300 font-medium">Episódio:</span> 
                            <span className="ml-1 text-cyan-200 font-semibold truncate">{episode}</span>
                        </p>
                        <p className="flex items-center">
                            <span className="inline-block w-3 h-3 rounded-full bg-purple-600 mr-2"></span>
                            <span className="text-gray-300 font-medium">Data de lançamento:</span> 
                            <span className="ml-1 text-cyan-200 font-semibold">{air_date}</span>
                        </p>

                        {/* Seção de imagens dos Personagens */}
                        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 rounded-lg border border-teal-400/30">
                            <p className="text-xs text-teal-400 uppercase font-bold mb-2">Personagens</p>
                            <div className="flex flex-wrap gap-2">
                            {charactersImagem.length > 0 ? (
                                charactersImagem.slice(0, 10).map((img, index) => (
                                <img key={index} src={img} alt="Personagens" className="w-10 h-10 rounded-full border border-teal-300 shadow-sm" />
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">Não há registro dos personagens desse episódio.</p>
                            )}
                        </div>
                        </div>
                    </div>
                </div>

            </div>)}
        </>
    )

}