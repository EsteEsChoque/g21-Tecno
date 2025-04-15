import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#submuracion">Submuración</a></li>
        <li><a href="#ascensores">Ascensores</a></li>
        <li><a href="#calculo3">Cálculo 3</a></li>
        <li><a href="#calculo4">Cálculo 4</a></li>
        <li><a href="#calculo5">Cálculo 5</a></li>
        <li><a href="https://github.com/EsteEsChoque" target="_blank" rel="noopener noreferrer">EsteEsChoque</a></li>
      </ul>
      <div className="brand">G21</div>
    </nav>
  );
}

export default Navbar;
