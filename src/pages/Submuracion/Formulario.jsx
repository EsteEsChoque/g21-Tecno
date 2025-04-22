import React, { useState } from 'react';
import './Formulario.css';
import Formulario2 from './Formulario2';

function Formulario({
  setAlto,
  setLargo,
  setAncho,
  setVolumen,
  setProfundidad,
  setCarga,
  setRecomendaciones,
  setImagen,
  onSubmit,
  alto,
  largo,
  ancho,
  esquinas,
  setEsquinas,
  nuevaEsquina,
  setNuevaEsquina,
  lados,
  setLados,
  nuevoLado,
  setNuevoLado,
  banquina,
  setBanquina,
  costom3,
  camiones,
  camionesCosto,
  setCostom3,
  setCamiones,
  setCamionesCosto,

  espesorMuro,
  setEspesorMuro,
  espesorRecalce,
  setEspesorRecalce,
  setVolumenMuro,
  setVolumenRecalce
}) {
  const [suelo, setSuelo] = useState('nada_cohesivos');
  const [carga, setCargaState] = useState('alta');

  // Información por tipo de suelo
  const sueloDatos = {
    nada_cohesivos: {
      suelo: "nada cohesivos",
      angulo: '35',
      esponjamiento: '10%',
      compactacion: '1.05',
      descripcion: 'Sin consistencia',
      composicion: 'Grava, arena seca, rellenos',
      herramienta: 'Pala ancha',
      imagen: '/image1.PNG',
    },
    poco_cohesivos: {
      suelo: "poco cohesivos",
      angulo: '45',
      esponjamiento: '20%',
      compactacion: '1.05',
      descripcion: 'Desmoronables',
      composicion: 'Greda, arena mojada, tierra vegetal',
      herramienta: 'Pala de punta',
      imagen: '/image2.PNG',
    },
    medianamente_cohesivos: {
      suelo: "medianamente cohesivos",
      angulo: '65',
      esponjamiento: '30%',
      compactacion: '1.10',
      descripcion: 'Blando pero resistente',
      composicion: 'Arcillas pegajizas, tierra colorada',
      herramienta: 'Pico',
      imagen: '/image3.PNG',
    },
    muy_cohesivos: {
      suelo: "muy cohesivos",
      angulo: '75',
      esponjamiento: '40%',
      compactacion: '1.15',
      descripcion: 'Duros y resistentes',
      composicion: 'Tosca, rocas blandas',
      herramienta: 'Pico y barra',
      imagen: '/image4.PNG',
    },
    muy_compactos: {
      suelo: "muy compactos",
      angulo: '80',
      esponjamiento: '50%',
      compactacion: '1.15',
      descripcion: 'Muy resistentes',
      composicion: 'Rocas duras',
      herramienta: 'Barreta y explosivos',
      imagen: '/image5.PNG',
    },
  };

  const agregarEsquina = () => {
    if (nuevaEsquina.volumen && nuevaEsquina.repeticiones) {
      setEsquinas([...esquinas, nuevaEsquina]);
      setNuevaEsquina({ volumen: '', repeticiones: '' });
    }
  };

  const agregarLado = () => {
    if (nuevoLado.ancho && nuevoLado.repeticiones) {
      setLados([...lados, nuevoLado]);
      setNuevoLado({ ancho: '', repeticiones: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const volumenCalculado = alto * largo * ancho;
    setVolumen(volumenCalculado);

    let profundidad;
    if (alto < 5) {
      profundidad = 'Menos de 5 metros';
    } else if (alto >= 5 && alto <= 10) {
      profundidad = 'De 5 a 10 metros';
    } else {
      profundidad = 'Más de 10 metros';
    }
    setProfundidad(profundidad);
    setCarga(carga);

    const datosSuelo = sueloDatos[suelo];
    onSubmit(suelo, volumenCalculado, datosSuelo, alto, largo, ancho);
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit} className="formulario">

        {/* Dimensiones */}
        <div>
          <label>Alto (m): </label>
          <input type="number" value={alto} min="1" onChange={e => setAlto(e.target.value)} />
        </div>
        <div>
          <label>Largo (m): </label>
          <input type="number" value={largo} min="1" onChange={e => setLargo(e.target.value)} />
        </div>
        <div>
          <label>Ancho (m): </label>
          <input type="number" value={ancho} min="1" onChange={e => setAncho(e.target.value)} />
        </div>

        {/* Tipo de suelo */}
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

        {/* Carga estructural */}
        <div>
          <label>Carga de la estructura existente: </label>
          <select value={carga} onChange={(e) => setCargaState(e.target.value)}>
            <option value="baja">Baja (una planta)</option>
            <option value="media">Media (2-3 plantas)</option>
            <option value="alta">Alta (más de 3 plantas)</option>
          </select>
        </div>

        <Formulario2 
          banquina={banquina}
          setBanquina={setBanquina}
          lados={lados}
          setLados={setLados}
          nuevoLado={nuevoLado}
          setNuevoLado={setNuevoLado}
          agregarLado={agregarLado}
          esquinas={esquinas}
          setEsquinas={setEsquinas}
          nuevaEsquina={nuevaEsquina}
          setNuevaEsquina={setNuevaEsquina}
          agregarEsquina={agregarEsquina}
        />

        <div>
          <label>Costo por m³ de movimiento de tierra ($):</label>
          <input
            type="number"
            placeholder="Ej: 53500"
            value={costom3}
            step="1"
            min="1"
            onChange={e => {
              const value = e.target.value;
              if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                setCostom3(value);
              }
            }}
          />
        </div>


        <div>
          <label>Costo por m³ de carga y camión ($):</label>
          <input
            type="number"
            placeholder="Ej: 46226"
            value={camionesCosto}
            step="0.01"
            min="0"
            onChange={e => {
              const value = e.target.value;
              if (value === '' || /^(\d+(\.\d{0,2})?)$/.test(value)) {
                setCamionesCosto(value);
              }
            }}
          />
        </div>


        <div>
          <label>Capacidad del camión (m³):</label>
          <input
            type="number"
            placeholder="Ej: 9"
            value={camiones}
            step="1"
            min="1"
            onChange={e => {
              const value = e.target.value;
              if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                setCamiones(value);
              }
            }}
          />
        </div>

        <div>
          <label>Espesor del muro medianero (cm): </label>
          <input
            type="number"
            placeholder="Ej: 30"
            step="1"
            min="20"
            max="80"
            value={espesorMuro}
            onChange={e => {
              const val = e.target.value;
              if (val === '' || (/^\d+$/.test(val) && parseInt(val) >= 20 && parseInt(val) <= 80)) {
                setEspesorMuro(val);
              }
            }}
          />
        </div>

        <div>
          <label>Espesor del recalce (cm): </label>
          <input
            type="number"
            placeholder="Ej: 5"
            step="1"
            min="5"
            max="10"
            value={espesorRecalce}
            onChange={e => {
              const val = e.target.value;
              if (val === '' || (/^\d+$/.test(val) && parseInt(val) >= 5 && parseInt(val) <= 10)) {
                setEspesorRecalce(val);
              }
            }}
          />
        </div>





        <button type="submit">Calcular</button>
      </form>
    </div>
  );
}

export default Formulario;
