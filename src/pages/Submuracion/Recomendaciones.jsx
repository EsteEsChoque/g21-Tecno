import React from 'react';

function Recomendaciones({ datosSuelo }) {
  // Verificamos que datosSuelo no sea null o undefined y tenga las propiedades necesarias
  if (!datosSuelo || Object.keys(datosSuelo).length === 0) {
    return <p>No se ha seleccionado un tipo de suelo. Por favor, seleccione un tipo de suelo para ver las recomendaciones.</p>;
  }

  return (
    <div className="volumenTotal2">
     <h2> RECOMENDACIÓN</h2>
        <p>
          Para realizar una submuración segura y eficiente, es esencial conocer el tipo de terreno con el que estamos trabajando. En este caso, seleccionaste un suelo <strong>{datosSuelo.suelo}</strong>.
        </p>
        <p>
          Para su estabilización, es crucial proporcionar una inclinación de talud de <strong>{datosSuelo.angulo}°</strong>, lo que permitirá evitar deslizamientos y accidentes. Este tipo de suelo está compuesto principalmente por <strong>{datosSuelo.composicion}</strong>, lo que lo convierte en un material <strong>{datosSuelo.descripcion}</strong>.
        </p>
        <p>
          La herramienta recomendada para trabajar en este tipo de terreno es el <strong>{datosSuelo.herramienta}</strong>, que facilitará la excavación y manejo del material sin comprometer la integridad del terreno circundante. Además, se debe tener en cuenta que estos suelos experimentan un esponjamiento del <strong>{datosSuelo.esponjamiento}</strong> al ser removidos, por lo que es importante calcular la cantidad de tierra a transportar considerando este factor.
        </p>
        <p>
          Es necesario dejar una banquina mínima de <strong>1 metro</strong> alrededor del área de trabajo para garantizar estabilidad y seguridad. Asimismo, los taludes no deben superar los <strong>1.5 metros</strong> de altura para evitar riesgos asociados a la pendiente del terreno.
        </p>
        <p>
          En caso de que las esquinas o sus lados tengan un ancho mayor a <strong>1.5 metros</strong>, deben ser trabajados de forma similar a los taludes, con la misma precaución y atención a la pendiente y la cohesión del material, para mantener la seguridad durante la obra.
        </p>
    </div>
  );
}

export default Recomendaciones;
