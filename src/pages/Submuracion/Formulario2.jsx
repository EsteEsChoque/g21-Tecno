import React from 'react';

function Formulario2({
  banquina, 
  setBanquina,
  lados, 
  setLados, 
  nuevoLado, 
  setNuevoLado, 
  agregarLado,
  esquinas, 
  setEsquinas, 
  nuevaEsquina, 
  setNuevaEsquina, 
  agregarEsquina
}) {
  return (
    <>
      {/* Banquina */}
      <div className="form-group">
        <label className="label-con-ayuda">
          Banquina
          <span className="icono-ayuda" title="La banquina es el espacio adicional que se deja entre la excavación y el área de trabajo. Se puede ajustar entre 1 y 2 metros según el terreno.">?</span>
        </label>
        <input
          type="number"
          placeholder="Banquina (1 a 2)"
          value={banquina}
          min="1"
          max="2"
          step="0.01"
          onChange={e => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            if (value === '' || (numericValue >= 1 && numericValue <= 2)) {
              setBanquina(value);
            }
          }}
        />
      </div>

      {/* Lados */}
      <div className="form-group">
        <label className="label-con-ayuda">
          Lados
          <span className="icono-ayuda" title="Ingresá el ancho del lado (entre 1 y 1.5 m) y dale al botón para guardar ese lado. Si tienes lados diferentes, ve agregándolos.">?</span>
        </label>
        <input
          type="number"
          placeholder="Ancho (1m - 1.5m)"
          value={nuevoLado.ancho}
          min="1"
          max="1.5"
          step="0.01"
          onChange={e => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            if (value === '' || (numericValue >= 1 && numericValue <= 1.5)) {
              setNuevoLado({ ...nuevoLado, ancho: value });
            }
          }}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevoLado.repeticiones}
          min="1"
          step="1"
          onChange={e => {
            const value = e.target.value;
            if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
              setNuevoLado({ ...nuevoLado, repeticiones: value });
            }
          }}
        />
        <button type="button" onClick={agregarLado}>Agregar Lado</button>
        <ul>
          {lados.map((l, i) => (
            <li key={i}>Ancho: {l.ancho} m, Cantidad: {l.repeticiones}</li>
          ))}
        </ul>
      </div>

      {/* Esquinas */}
      <div className="form-group">
        <label className="label-con-ayuda">
          Esquinas
          <span className="icono-ayuda" title="Ingresá el volumen individual de la esquina (en m³) y dale al botón para guardarla. Si tenés esquinas diferentes, agregalas una por una.">?</span>
        </label>
        <input
          type="number"
          placeholder="Lado 1 (cm)"
          value={nuevaEsquina.lado1Ancho}
          min="0.01"
          step="0.01"
          onChange={e => {
            const value = e.target.value;
            if (value === '' || parseFloat(value) > 0) {
              setNuevaEsquina({ ...nuevaEsquina, lado1Ancho: value });
            }
          }}
        />
        <input
          type="number"
          placeholder="Lado 2 (cm)"
          value={nuevaEsquina.lado2Ancho}
          min="0.01"
          step="0.01"
          onChange={e => {
            const value = e.target.value;
            if (value === '' || parseFloat(value) > 0) {
              setNuevaEsquina({ ...nuevaEsquina, lado2Ancho: value });
            }
          }}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevaEsquina.repeticiones}
          min="1"
          step="1"
          onChange={e => {
            const value = e.target.value;
            if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
              setNuevaEsquina({ ...nuevaEsquina, repeticiones: value });
            }
          }}
        />
        <button type="button" onClick={agregarEsquina}>Agregar Esquina</button>
        <ul>
          {esquinas.map((e, i) => (
            <li key={i}>
              Lado 1: {e.lado1Ancho} cm, Lado 2: {e.lado2Ancho} cm, Repeticiones: {e.repeticiones}
            </li>
          ))}
        </ul>
      </div>  
    </>
  );
}

export default Formulario2;
