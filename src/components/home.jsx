import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/_home.scss';

const HomePage = () => {
  return (
    <div className="text_class">
      <h1>Bienvenue sur notre jeu du pendu !</h1>
      <p>Ceci est un jeu classique du pendu. Vous devez deviner le mot caché en proposant des lettres. Chaque fois que vous proposez une lettre qui n'est pas dans le mot, un élément du pendu est dessiné. Le jeu se termine lorsque le mot est deviné ou lorsque le dessin du pendu est terminé.</p>
      <Link to="/GamePage">Commencer à jouer</Link>
    </div>
  );
};

export default HomePage;