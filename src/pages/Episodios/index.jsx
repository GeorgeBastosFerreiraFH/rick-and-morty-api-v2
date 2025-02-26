import { useEffect, useState } from "react";
import { getEpisodios } from "../../services/api";
import { CardEpisodio } from "../../components/CardEpisodio";

export const Episodios = () => {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() =>{
    async function fetchEpisodios() {
      setLoading(true);
      setError("");

      try {
        const data = await getEpisodios(page);

        if (data.results?.length > 0) {
          setEpisodios((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
          setTotalPages(data.info.pages);
        } else {
          setError("Nenhuma episódios encontrado.");
        }
      } catch (error) {
        setError("Erro ao carregar episódios.");
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodios();
  }, [page])



  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800">
        <div className="container mx-auto px-4 py-10">

          {/* Título */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"></div>
            <h2 className="text-3xl font-bold text-white px-6 whitespace-nowrap">Episódios</h2>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent w-full"></div>
          </div>

          {loading && page === 1 ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
              </div>
            </div>
            ) : error ? (
              <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-6 text-center max-w-md mx-auto">
                <p className="text-lg text-purple-400">{error}</p>
              </div>
            ) : episodios.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {episodios.map((local) => (
                  <CardEpisodio
                    key={local.id}
                    id={local.id}
                    name={local.name}
                    air_date={local.air_date}
                    episode={local.episode}
                    characters={local.characters}
                  />
                ))}
              </div>
            ) : null}

            {/* Botão "Carregar Mais" */}
            {page < totalPages && !loading && !error && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="btn bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white border-none ppy-3  rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 font-bold text-lg"
                >
                  <span>Carregar Mais</span>
                </button>
              </div>
            )}
        

        </div>
      </div>
    </>
  );
};
