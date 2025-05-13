import React, { useState } from 'react';
import ModalAyuda from './ModalAyuda'; // asegurate de poner bien la ruta

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
  agregarEsquina,
}) {
  const [ayudaVisible, setAyudaVisible] = useState(false);
  const [mensajeAyuda, setMensajeAyuda] = useState('');

  const mostrarAyuda = (mensaje) => {
    setMensajeAyuda(mensaje);
    setAyudaVisible(true);
  };

  const eliminarLado = (index) => {
    const nuevosLados = lados.filter((_, i) => i !== index);
    setLados(nuevosLados);
  };
  
  const eliminarEsquina = (index) => {
    const nuevasEsquinas = esquinas.filter((_, i) => i !== index);
    setEsquinas(nuevasEsquinas);
  };


  return (
    <>
      {ayudaVisible && (
        <ModalAyuda
          mensaje={mensajeAyuda}
          onClose={() => setAyudaVisible(false)}
        />
      )}

      {/* Banquina */}
      <div className="form-group">
        <label className="label-con-ayuda">
          Banquina
          <button
            type="button"
            className="btn-ayuda"
            onClick={() =>
              mostrarAyuda("ℹ️ La banquina es el espacio adicional que se deja entre la excavación y el área de trabajo. Se debe ajustar entre 1 y 2.")
            }
          >?</button>
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
          <button
            type="button"
            className="btn-ayuda"
            onClick={() =>
              mostrarAyuda("ℹ️ Ingresá el ancho del lado (entre 1 y 1.5 m) y dale al botón para guardarlo. Si hay lados distintos, agregalos uno por uno.")
            }
          >?</button>
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
             <li key={i}>
              Ancho: {l.ancho} m, Cantidad: {l.repeticiones}
              <button type="button" onClick={() => eliminarLado(i)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Esquinas */}
      <div className="form-group">
        <label className="label-con-ayuda">
          Esquinas
          <button
            type="button"
            className="btn-ayuda"
            onClick={() =>
              mostrarAyuda("ℹ️ Ingresá los lados de la esquina (en cm) y la cantidad. Si tenés esquinas diferentes, agregalas una por una.")
            }
          >?</button>
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
              <button type="button" onClick={() => eliminarEsquina(i)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Formulario2;
