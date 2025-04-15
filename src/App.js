import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Submuracion from './pages/Submuracion/Submuracion';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Submuracion />
      <Footer />
    </div>
  );
}

export default App;
