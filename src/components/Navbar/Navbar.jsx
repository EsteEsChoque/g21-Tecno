import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
      <li><Link to="/submuracion">Submuración</Link></li>
      <li><Link to="/ascensores">Ascensores</Link></li>
        <li><a href="https://github.com/EsteEsChoque" target="_blank" rel="noopener noreferrer">EsteEsChoque</a></li>
      </ul>
      <div className="brand">G21</div>
    </nav>
  );
}

export default Navbar;
