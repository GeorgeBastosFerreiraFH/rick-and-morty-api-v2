import axios from "axios";

const URL = "https://rickandmortyapi.com/api";

const api = axios.create({
  baseURL: URL,
  timeout: 5000,
});



export async function getPersonagens(page = 1, filters = {}) {
    try {
      const response = await api.get(`/character`, { params: { page, ...filters } });
      return response.data;
    } catch (error) {
      console.log(`Erro ao buscar personagens: ${error.message}`);
    }
  }
  
export async function getPersonagemById(id) {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar personagem ID ${id}:`, error);
    return null;
  }
}


export async function getEpisodios(page = 1) {
  try {
    const response = await api.get(`/episode`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar episódios:", error);
    return null;
  }
}

//Rota nao utilizada - Apenas para caso futuramente queria colocar um filtro para buscar Episodios especificos
export async function getEpisodioById(id) {
  try {
    const response = await api.get(`/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar episódio ID ${id}:`, error);
    return null;
  }
}

export async function getLocalizacao(page = 1) {
  try {
    const response = await api.get(`/location`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar localizações:", error);
    return null;
  }
}

//Rota nao utilizada - Apenas para caso futuramente queria colocar um filtro para buscar Localizações especificas
export async function getLocalizacaoById(id) {
  try {
    const response = await api.get(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar localização ID ${id}:`, error);
    return null;
  }
}
