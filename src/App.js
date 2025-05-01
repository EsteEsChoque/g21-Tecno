import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Submuracion from './pages/Submuracion/Submuracion';
import AlertaInfo from './pages/AlertaInfo';

function App() {
  return (
    <div className="App">
      <Navbar />
       <AlertaInfo />
      <div className="main-content"> 

      <Submuracion />
      </div>
      <Footer />
    </div>
  );
}

export default App;
