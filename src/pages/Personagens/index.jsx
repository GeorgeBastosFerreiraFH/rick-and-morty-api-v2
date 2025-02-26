import { useEffect, useState } from "react";
import { getPersonagens } from "../../services/api";
import { CardPersonagem } from "../../components/CardPersonagem";
import { useSearchParams } from "react-router-dom";
import { BarraDePesquisa } from "../../components/BarraDePesquisa";

export const Personagens = () => {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKey, setSearchKey] = useState(Date.now());

  const name = searchParams.get("search") || "";
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
  
      try {
        const filters = { name, species, gender, status };
        const data = await getPersonagens(page, filters);
  
        if (data.results?.length > 0) {
          setPersonagens((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
          setTotalPages(data.info.pages);
        } else {
          setError("Nenhum personagem encontrado.");
        }
      } catch (err) {
        setError("Erro ao buscar personagens.");
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [page, name, species, gender, status]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800">
      <div className="container mx-auto px-4 py-10">

        {/* Título da seção de personagens */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"></div>
          <h2 className="text-3xl font-bold text-white px-6 whitespace-nowrap">Personagens</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent w-full"></div>
        </div>

        {/* Filtros */}
        <div className="bg-slate-800/70 rounded-2xl p-6 shadow-lg border border-teal-500/20 mb-12">
          <div className="flex flex-col md:flex-row justify-center gap-5 flex-wrap">
            <BarraDePesquisa searchKey={searchKey} />
            
            <select
              className="select select-bordered border-cyan-400/50 bg-slate-900 text-white focus:border-cyan-400 min-w-52"
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value);
                setPersonagens([]);
                setPage(1);
              }}
            >
              <option value="">Todas Espécies</option>
              <option value="animal">Animal</option>
              <option value="alien">Alien</option>
              <option value="disease">Doença</option>
              <option value="unknown">Desconhecido</option>
              <option value="human">Humano</option>
              <option value="humanoid">Humanoide</option>
              <option value="mythological">Mitológico</option>
              <option value="poopybutthole">Poopybutthole</option>
              <option value="robot">Robô</option>
            </select>

            <select
              className="select select-bordered border-purple-400/50 bg-slate-900 text-white focus:border-purple-400 min-w-52"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setPersonagens([]);
                setPage(1);
              }}
            >
              <option value="">Todos Gêneros</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sem Gênero</option>
              <option value="unknown">Desconhecido</option>
            </select>

            <select
              className="select select-bordered border-teal-400/50 bg-slate-900 text-white focus:border-teal-400 min-w-52"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPersonagens([]);
                setPage(1);
              }}
            >
              <option value="">Todos Status</option>
              <option value="alive">Vivo</option>
              <option value="dead">Morto</option>
              <option value="unknown">Desconhecido</option>
            </select>
          </div>
        </div>

        {/* Exibir carregamento */}
        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          // Exibir erro caso ocorra falha na requisição ou não encontre personagens
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-6 text-center max-w-md mx-auto">
            <p className="text-lg text-purple-400">{error}</p>
            <button 
              onClick={() => {
                setPage(1);
                setSpecies("");
                setGender("");
                setStatus("");

                setSearchParams({}); // Limpa a busca nos parâmetros da URL
                setSearchKey(Date.now()); // Gera um novo valor para resetar a BarraDePesquisa
              }}
              className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        ) : personagens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personagens.map((personagem) => (
              <CardPersonagem
                key={personagem.id}
                id={personagem.id}
                image={personagem.image}
                name={personagem.name}
                species={personagem.species}
                status={personagem.status}
                location={personagem.location?.name}
                url=""
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
              {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
                </div>
              </div>
              ) : (
                <span>Carregar Mais</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};