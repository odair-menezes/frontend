import React from "react"; // Importação do React
import { BrowserRouter, Route } from "react-router-dom"; // Importação das trativas de rotas

import Login from "./pages/Login"; // Importando a página de Login
import Main from "./pages/Main"; // Importando a página Principal

export default function Routes() {
  // Exporta rotina de rotas
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/dev/:id" component={Main} />
    </BrowserRouter>
  );
}
