import axios from "axios"; // Importa o axios que é quem trata de acessoa a APIS

const api = axios.create({
  // Cria uma base do caminho de comunicação
  baseURL: "http://localhost:3333"
});

export default api; // Exporta o acesso ao módulo API
