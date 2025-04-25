import React, { useState } from 'react';
import Formulario from './Formulario';
import Calculo from './Calculo';
import Costo from './Costo';
import Muro from './Muro';
import './Submuracion.css';

function Submuracion() {
  const [volumen, setVolumen] = useState(null);
  const [profundidad, setProfundidad] = useState('');
  const [carga, setCarga] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [datosSuelo, setDatosSuelo] = useState({});
  const [imagen, setImagen] = useState('');

   // Definimos los estados para alto, largo y ancho
   const [alto, setAlto] = useState('');
   const [largo, setLargo] = useState(''); 
   const [ancho, setAncho] = useState('');

   // Estados para esquinas
  const [esquinas, setEsquinas] = useState([]);
  const [nuevaEsquina, setNuevaEsquina] = useState({ lado1Ancho: '', lado2Ancho: '', repeticiones: '' });

  // Estados para lados
  const [lados, setLados] = useState([]);
  const [nuevoLado, setNuevoLado] = useState({ ancho: '', repeticiones: '' });

  const [banquina, setBanquina] = useState('1');
  const banquinaNumerica = parseFloat(banquina);

  const [costom3, setCostom3] = useState('');
  const [costom3h, setCostom3h] = useState('');
  const [costomMamposteria, setCostomMamposteria] = useState('');
  const [camionesCosto, setCamionesCosto] = useState('');
  const [costoRecalce, setCostoRecalce] = useState('');
  const [camiones, setCamiones] = useState('');

  const [superficieLados, setSuperficieLados] = useState(0);
  const [superficieEsquina, setSuperficieEsquina] = useState(0);

  const [volumenCompensado, setVolumenCompensado] = useState(0);
  const [volumenCentroCompensado, setVolumenCentroCompensado] = useState(0);

  const [espesorMuro, setEspesorMuro] = useState('');
  const [espesorRecalce, setEspesorRecalce] = useState('');

  const [volumenMuro, setVolumenMuro] = useState(0);
  const [volumenRecalce, setVolumenRecalce] = useState(0);


  // Manejo del formulario
  const handleFormularioSubmit = (sueloSeleccionado, volumenOriginal, datosSuelo) => {
    setDatosSuelo(datosSuelo);
    setImagen(datosSuelo.imagen);  // Guardamos la imagen del tipo de suelo seleccionado
    setAlto(alto); 
    setLargo(largo);
    setAncho(ancho);

    const coefEsponjamiento = datosSuelo.esponjamiento;
    const coefCompactacion = datosSuelo.compactacion;
    // Generar recomendaciones detalladas
    const recomendaciones = [];

    

    // Actualizamos las recomendaciones con un array de <p> para cada recomendación
    setRecomendaciones(recomendaciones);
  };
 
  return (
    <div>
        <h3>Calculos de Submuración</h3>
        <Formulario
          setVolumen={setVolumen}
          setProfundidad={setProfundidad}
          setCarga={setCarga}
          setRecomendaciones={setRecomendaciones}
          setImagen={setImagen}
          onSubmit={handleFormularioSubmit}
          alto={alto}   // Pasamos el estado de alto
          largo={largo} // Pasamos el estado de largo
          ancho={ancho} // Pasamos el estado de ancho
          setAlto={setAlto}
          setLargo={setLargo}
          setAncho={setAncho}

          // Props para esquinas
          esquinas={esquinas}
          setEsquinas={setEsquinas}
          nuevaEsquina={nuevaEsquina}
          setNuevaEsquina={setNuevaEsquina}

          // Props para lados
          lados={lados}
          setLados={setLados}
          nuevoLado={nuevoLado}
          setNuevoLado={setNuevoLado}

          banquina={banquina}
          setBanquina={setBanquina}

          // Nuevos estados
          costom3={costom3}
          costom3h={costom3h}
          costomMamposteria={costomMamposteria}
          camionesCosto={camionesCosto}
          costoRecalce={costoRecalce}
          camiones={camiones}
          setCostom3={setCostom3}
          setCostom3h={setCostom3h}
          setCostomMamposteria={setCostomMamposteria}
          setCamionesCosto={setCamionesCosto}
          setCostoRecalce={setCostoRecalce}
          setCamiones={setCamiones}

          espesorMuro={espesorMuro}
          setEspesorMuro={setEspesorMuro}
          espesorRecalce={espesorRecalce}
          setEspesorRecalce={setEspesorRecalce}
          setVolumenMuro={setVolumenMuro}
          setVolumenRecalce={setVolumenRecalce}
        />
      {volumen && profundidad && carga && (
          
          <div>

        <div>
        <Calculo 
          volumenOriginal={volumen} 
          coeficiente={datosSuelo.esponjamiento} 
          volumenCimiento={1.78}  // Volumen del cimiento (ejemplo estático)
          coeficienteComp={datosSuelo.compactacion}  // Coeficiente de compactación dinámico
          angulo={datosSuelo.angulo} 
          ancho={ancho}  // Pasamos los valores de ancho
          alto={alto}    // Pasamos los valores de alto
          largo={largo}  // Pasamos los valores de largo

          banquina={banquinaNumerica}
          lados={lados}
          esquinas={esquinas}

          superficieLados={superficieLados}
          setSuperficieLados={setSuperficieLados}

          superficieEsquina={superficieEsquina}
          setSuperficieEsquina={setSuperficieEsquina}

          setVolumenCompensado={setVolumenCompensado}
          setVolumenCentroCompensado={setVolumenCentroCompensado}
          />
        
        <Costo
          volumenCompensado={volumenCompensado}
          volumenCentroCompensado={volumenCentroCompensado}
          costom3 ={costom3}
          camiones = {camiones}
          camionesCosto = {camionesCosto}
        />

        <Muro
          largo={largo}
          ancho={ancho}
          alto={alto}
          espesorRecalce={espesorRecalce}
          espesorMuro={espesorMuro}
          lados={lados}
          esquinas={esquinas}
        />
  
        {/* Mostrar la imagen correspondiente */}
        {imagen && <img src={imagen} alt="Tipo de suelo" />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Submuracion;
