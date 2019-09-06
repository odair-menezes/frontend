import React, { useEffect, useState } from 'react'; // Importação do React / Uma função que podemos chamar antes do return
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './main.css'; // Importa estilização da Página

import api from '../services/api'; // Importa a API

import logo from '../assets/logo.svg'; // Importando a imagem
import dislike from '../assets/dislike.svg'; // Importando a imagem
import like from '../assets/like.svg'; // Importando a imagem
import itsamatch from '../assets/itsamatch.png'; // Importando a imagem

export default function Main({ match }) {
  // Recupera atraves do match todos os parâmetros enviados na URL da rota

  const [user, setUser] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        // Busca a lista de devs para o usuário logado
        headers: {
          user: match.params.id
        }
      });

      setUser(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleDisLike(id) {
    await api.post(`/devs/${id}/dislike`, null, {
      headers: { user: match.params.id }
    });
    setUser(user.filter(user => user._id !== id));
  }

  async function handleLike(id) {
    await api.post(`/devs/${id}/like`, null, {
      headers: { user: match.params.id }
    });
    setUser(user.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {user.length > 0 ? (
        <ul>
          {user.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDisLike(user._id)}>
                  <img src={dislike} alt="DisLike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="" />
          <strong>{matchDev.nome}</strong>
          <p>{match.bio}</p>
          <button type="button">FECHAR</button>
        </div>
      )}
    </div>
  );
}
