import React, { useState } from 'react';
import Formulario from './Formulario';
import Calculo from './Calculo';
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
  const [nuevaEsquina, setNuevaEsquina] = useState({ volumen: '', repeticiones: '' });

  // Estados para lados
  const [lados, setLados] = useState([]);
  const [nuevoLado, setNuevoLado] = useState({ ancho: '', repeticiones: '' });

  const [banquina, setBanquina] = useState('1');
  const banquinaNumerica = parseFloat(banquina);
console.log(datosSuelo, "----------------");

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

    // Recomendaciones basadas en el tipo de suelo
    if (sueloSeleccionado === 'nada_cohesivos') {
      recomendaciones.push(
        'Este tipo de suelo es fácilmente excavable, pero dado su bajo nivel de cohesión, se recomienda el uso de micropilotes para estabilizar la excavación. Si la excavación es superficial (menos de 5 metros), no será necesario un refuerzo adicional. Para profundidades mayores, se puede evaluar el uso de muros pantalla para asegurar la estabilidad.'
      );
    } else if (sueloSeleccionado === 'poco_cohesivos') {
      recomendaciones.push(
        'El suelo tiene un esponjamiento del 20%, lo que puede dificultar la excavación. Se recomienda el uso de micropilotes con drenaje adicional para evitar asentamientos post-excavación. Si la excavación supera los 5 metros de profundidad, se recomienda el uso de muros pantalla para una mejor estabilidad.'
      );
    } else if (sueloSeleccionado === 'medianamente_cohesivos') {
      recomendaciones.push(
        'Este tipo de suelo es moderadamente cohesivo, con un esponjamiento del 30%. Se recomienda el uso de micropilotes o muros pantalla, dependiendo de la profundidad y las cargas a soportar. Si la excavación es profunda (más de 10 metros), es crucial considerar la utilización de pilotes de mayor capacidad.'
      );
    } else if (sueloSeleccionado === 'muy_cohesivos') {
      recomendaciones.push(
        'Este suelo presenta un alto nivel de cohesión y es más difícil de excavar. Se recomienda el uso de muros pantalla reforzados o micropilotes de alta capacidad para estabilizar la excavación. Para excavaciones profundas, considera el uso de barras o barrenas especializadas para facilitar la perforación.'
      );
    } else if (sueloSeleccionado === 'muy_compactos') {
      recomendaciones.push(
        'Este suelo es extremadamente duro, con un esponjamiento del 50%. Debido a su alta compactación, se recomienda el uso de perforación rotativa, barretas, o en casos extremos, el uso de explosivos para realizar la excavación. Además, se debe usar maquinaria pesada para mover el material de excavación y garantizar la estabilidad durante la obra.'
      );
    }

    // Recomendaciones basadas en la profundidad
    if (profundidad === 'Menos de 5 metros') {
      recomendaciones.push('La excavación es relativamente superficial, no se necesita un refuerzo excesivo.');
    } else if (profundidad === 'De 5 a 10 metros') {
      recomendaciones.push('Se recomienda utilizar micropilotes para una excavación más profunda.');
    } else if (profundidad === 'Más de 10 metros') {
      recomendaciones.push('Para excavaciones profundas, se recomienda el uso de muros pantalla o micropilotes de alta capacidad.');
    }

    // Recomendaciones basadas en la carga estructural
    if (carga === 'baja') {
      recomendaciones.push('La estructura ligera no requiere refuerzos pesados en los cimientos.');
    } else if (carga === 'media') {
      recomendaciones.push('Para una carga media, se recomienda un refuerzo adicional en los cimientos mediante micropilotes.');
    } else if (carga === 'alta') {
      recomendaciones.push('Para cargas altas, se debe considerar un recalce completo de los cimientos y el uso de técnicas de refuerzo fuertes.');
    }

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
      />
      {volumen && profundidad && carga && (
          
          <div>

        <div className="resultados-container">
          <div className="resultados">
            <h3>Resultados de Submuración</h3>
            <p>Volumen de excavación: {volumen} m³</p>
            <p>Profundidad de Excavación: {profundidad}</p>
            <p>Carga de la estructura: {carga}</p>          
          </div>

          <div className="recomendaciones">
            <h3>Recomendaciones:</h3>
            {/* Mostrar cada recomendación en un párrafo separado */}
            {recomendaciones.map((recomendacion, index) => (
                <p key={index}>{recomendacion}</p>
            ))}
        </div>
          </div>
        {/* Mostrar el cálculo de esponjamiento */}
        <div>
        <Calculo 
          volumenOriginal={volumen} 
          coeficiente={datosSuelo.esponjamiento} 
          volumenCimiento={1.78}  // Volumen del cimiento (ejemplo estático)
          coeficienteComp={datosSuelo.compactacion}  // Coeficiente de compactación dinámico
          ancho={ancho}  // Pasamos los valores de ancho
          alto={alto}    // Pasamos los valores de alto
          largo={largo}  // Pasamos los valores de largo

          banquina={banquinaNumerica}
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
