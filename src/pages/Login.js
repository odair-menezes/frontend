import React, { useState } from "react"; // Importa o React
import "./Login.css"; // Importa a estilização da Página de Login

import api from "../services/api";

import logo from "../assets/logo.svg"; // Importando a imagem

export default function Login({ history }) {
  // Exporta a função de Login

  const [userName, setUserName] = useState(""); // Cria uma variável que vai ser manipulada por algum evento

  async function handleSubmit(e) {
    // Cria uma função para tratar o evento
    e.preventDefault(); // Desabilita o evento padrão de enviar para outra página

    const response = await api.post("/devs", {
      userName
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário do Github"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
