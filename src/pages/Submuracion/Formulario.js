import React, { useState } from 'react';

function Formulario({ setAlto,setLargo,setAncho, setVolumen, setProfundidad, setCarga, setRecomendaciones, setImagen, onSubmit, alto, largo, ancho }) {
  const [suelo, setSuelo] = useState('nada_cohesivos');
  const [carga, setCargaState] = useState('alta');

  // Datos por tipo de suelo
  const sueloDatos = {
    nada_cohesivos: {
      angulo: '35°',
      esponjamiento: '10%',
      compactacion: '1.05', // Valor de compactación agregado
      descripcion: 'Sin consistencia',
      composicion: 'Grava, arena seca, rellenos',
      herramienta: 'Pala ancha',
      imagen: '/image1.PNG', 
    },
    poco_cohesivos: {
      angulo: '45°',
      esponjamiento: '20%',
      compactacion: '1.05', // Valor de compactación agregado
      descripcion: 'Desmoronables',
      composicion: 'Greda, arena mojada, tierra vegetal',
      herramienta: 'Pala de punta',
      imagen: '/image2.PNG',
    },
    medianamente_cohesivos: {
      angulo: '65°',
      esponjamiento: '30%',
      compactacion: '1.10', // Valor de compactación agregado
      descripcion: 'Blando pero resistente',
      composicion: 'Arcillas pegajizas, tierra colorada',
      herramienta: 'Pico',
      imagen: '/image3.PNG',
    },
    muy_cohesivos: {
      angulo: '75°',
      esponjamiento: '40%',
      compactacion: '1.15', // Valor de compactación agregado
      descripcion: 'Duros y resistentes',
      composicion: 'Tosca, rocas blandas',
      herramienta: 'Pico y barra',
      imagen: '/image4.PNG',
    },
    muy_compactos: {
      angulo: '80°',
      esponjamiento: '50%',
      compactacion: '1.15', // Valor de compactación agregado
      descripcion: 'Muy resistentes',
      composicion: 'Rocas duras',
      herramienta: 'Barreta y explosivos',
      imagen: '/image5.PNG',
    },
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcular el volumen de excavación
    const volumenCalculado = alto * largo * ancho;
    setVolumen(volumenCalculado);

    // Calcular la profundidad en base a "alto"
    let profundidad;
    if (alto < 5) {
      profundidad = 'Menos de 5 metros';
    } else if (alto >= 5 && alto <= 10) {
      profundidad = 'De 5 a 10 metros';
    } else if (alto > 10) {
      profundidad = 'Más de 10 metros';
    }
    setProfundidad(profundidad);

    // Establecer carga
    setCarga(carga);

    // Obtener los datos del tipo de suelo seleccionado
    const datosSuelo = sueloDatos[suelo];

    // Pasar los datos del formulario a Submuracion.js para las recomendaciones
    onSubmit(suelo, volumenCalculado, datosSuelo, alto, largo, ancho); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Alto (m): </label>
        <input
          type="number"
          value={alto}
           min="1"
          onChange={(e) => setAlto(e.target.value)}
        />
      </div>
      <div>
        <label>Largo (m): </label>
        <input
          type="number"
          value={largo}
           min="1"
          onChange={(e) => setLargo(e.target.value)}
        />
      </div>
      <div>
        <label>Ancho (m): </label>
        <input
          type="number"
          value={ancho}
           min="1"
          onChange={(e) => setAncho(e.target.value)}
        />
      </div>
      <div>
        <label>Tipo de suelo: </label>
        <select value={suelo} onChange={(e) => setSuelo(e.target.value)}>
          <option value="nada_cohesivos">Nada cohesivos</option>
          <option value="poco_cohesivos">Poco cohesivos</option>
          <option value="medianamente_cohesivos">Medianamente cohesivos</option>
          <option value="muy_cohesivos">Muy cohesivos</option>
          <option value="muy_compactos">Muy compactos</option>
        </select>
      </div>

      <div>
        <label>Carga de la estructura existente: </label>
        <select value={carga} onChange={(e) => setCargaState(e.target.value)}>
          <option value="baja">Baja (una planta)</option>
          <option value="media">Media (2-3 plantas)</option>
          <option value="alta">Alta (más de 3 plantas)</option>
        </select>
      </div>

      <button type="submit">Calcular</button>
    </form>
  );
}

export default Formulario;
