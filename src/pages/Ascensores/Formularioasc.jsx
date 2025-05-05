import React from 'react';
import './Formulario.css';

const AscensorFormulario = ({ 
  pisosAltos, setPisosAltos, 
  pisosBajos, setPisosBajos, 
  altProm, setAltProm,

}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Datos de los Ascensores</h2>

      <label>
        Pisos Altos:
        <input 
          type="number" 
          value={pisosAltos} 
          onChange={(e) => setPisosAltos(Number(e.target.value))}
        />
      </label>

      <label>
        Pisos Bajos:
        <input 
          type="number" 
          value={pisosBajos} 
          onChange={(e) => setPisosBajos(Number(e.target.value))}
        />
      </label>

      <label>
      Altura Promedio de Pisos (en metros):
      <select 
        value={altProm} 
        onChange={(e) => setAltProm(Number(e.target.value))}
      >
        <option value={3}>3</option>
        <option value={3.1}>3.1</option>
        <option value={3.2}>3.2</option>
        <option value={3.3}>3.3</option>
        <option value={3.4}>3.4</option>
        <option value={3.5}>3.5</option>
        <option value={3.6}>3.6</option>
        <option value={3.7}>3.7</option>
        <option value={3.8}>3.8</option>
        <option value={3.9}>3.9</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>
    </label>
   
      <button type="submit">actualizar</button>
    </form>
  );
};

export default AscensorFormulario;
