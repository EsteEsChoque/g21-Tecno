import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa las rutas
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Submuracion from './pages/Submuracion/Submuracion';
import Ascensores from './pages/Ascensores/Ascensores'; // Nueva página
import AlertaInfo from './pages/AlertaInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          {/* Aquí definimos las rutas */}
          <Routes>
          <Route path="/" element={<Submuracion />} />
            <Route path="/submuracion" element={<Submuracion />} />
            <Route path="/ascensores" element={<Ascensores />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
