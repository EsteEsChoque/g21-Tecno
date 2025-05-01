import React from 'react';

function Muro({ 
  largo, 
  ancho, 
  alto, 
  espesorRecalce, 
  espesorMuro, 
  lados, 
  esquinas,
  volumenCentroCompensado,
  /*horaR,
  horaM,
  grupos,
  volumenRetroexcavadora */ }) {
  // Convertimos los espesores de cm a m
  const espRecalceM = parseInt(espesorRecalce) / 100;
  const espMuroM = parseInt(espesorMuro) / 100;
  const ancho1 = parseFloat(ancho)
  const largo1 = parseFloat(largo)

  const datosValidos =
    !isNaN(largo) && !isNaN(ancho) && !isNaN(alto) &&
    !isNaN(espRecalceM) && !isNaN(espMuroM) &&
    alto > espRecalceM;

  if (!datosValidos) {
    return <p>⚠️ Por favor completá correctamente los datos para calcular los volúmenes.</p>;
  }
console.log(volumenCentroCompensado);

  // 📏 Volúmenes
  const volumenRecalce =  espMuroM * (ancho1 +ancho1 +  largo1 + largo1) * espRecalceM;
  const volumenMuro = espMuroM * ancho * largo * (alto - espRecalceM);

  //tiempos
  const horaR = 0.045
  const horaM = 1
  const grupos = 3
  const volumenRetroexcavadora = 70; 

  const tiempoRecalce = (volumenRecalce / horaR) * 1; // 1 hora por 0.045 m³ de recalce
  const tiempoMuro = (volumenMuro / horaM) * 6; // 6 horas por 1 m³ de mampostería

  // Dividir entre 3 grupos de operarios
  const tiempoTotalRecalce = tiempoRecalce / grupos;
  const tiempoTotalMuro = tiempoMuro / grupos;

  // 🕰 Cálculo del tiempo con retroexcavadora
  const diasRetroexcavadora = (volumenCentroCompensado / volumenRetroexcavadora).toFixed(); // Calcular días necesarios
  

  return (
    <div className="muro-container">
      <h3>🧱 Volumen del muro medianero</h3>
      <p><strong>Volumen del recalce:</strong> {volumenRecalce.toFixed(1)} m³</p>
      <p><strong>Volumen del muro medianero:</strong> {volumenMuro.toFixed(1)} m³</p>

      <h3>⏱ Tiempo de ejecución de la mampostería</h3>
      <p>{horaM}m3 de mampostería ------------------------------6 horas</p>
      <p>Tiempo estimado para ejecutar la mampostería (con {grupos} grupos de operarios): {tiempoTotalMuro.toFixed()} horas</p>

      <h3>⏱ Tiempo de ejecución del recalce</h3>
      <p>1ml = {horaR} m3 de recalce ------------------------1 hora</p>
      <p>Tiempo estimado para ejecutar el recalce (con {grupos} grupos de operarios): {tiempoTotalRecalce.toFixed()} horas</p>
    
      <h3>⏱ Tiempo de ejecución con retroexcavadora</h3>
      <p>Volumen central + Esponjamiento</p>
      <p>{volumenCentroCompensado} m³</p>
      <p>retroexcavadora – aprox. {volumenRetroexcavadora}m3/hora</p>
      <p>Una retroexcavadora puede mover el volumen compensado de tierra en aproximadamente {diasRetroexcavadora} horas.</p>
     
    </div>
  );
}

export default Muro;
