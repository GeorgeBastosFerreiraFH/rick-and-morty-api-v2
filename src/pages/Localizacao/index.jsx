import { useEffect, useState } from "react";
import { getLocalizacao } from "../../services/api";
import { CardLocalizao } from "../../components/CardLocalizacao";

export const Localizacoes = () => {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchLocalizacoes() {
      setLoading(true);
      setError("");
            
      try {
        const data = await getLocalizacao(page);

        if (data.results?.length > 0) {
          setLocalizacoes((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
          setTotalPages(data.info.pages);
        } else {
          setError("Nenhuma localização encontrada.");
        }
      } catch (err) {
        setError("Erro ao buscar localizações.");
      } finally {
        setLoading(false);
      }
    }

    fetchLocalizacoes();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800">
      <div className="container mx-auto px-4 py-10">

        {/* Título */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"></div>
          <h2 className="text-3xl font-bold text-white px-6 whitespace-nowrap">Localizações</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent w-full"></div>
        </div>

        {/* Exibir carregamento */}
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
        ) : localizacoes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {localizacoes.map((local) => (
              <CardLocalizao
                key={local.id}
                id={local.id}
                name={local.name}
                type={local.type}
                dimension={local.dimension}
                residents={local.residents}
              />
            ))}
          </div>
        ) : null}

        {/* Botão "Carregar Mais" */}
        {page < totalPages && !loading && !error && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="btn bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white border-none px-8 py-3 rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 font-bold text-lg"
            >
              <span>Carregar Mais</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
