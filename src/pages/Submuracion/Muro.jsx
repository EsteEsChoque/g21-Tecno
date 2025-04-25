import React from 'react';

function Muro({ largo, ancho, alto, espesorRecalce, espesorMuro, lados, esquinas }) {
  // Convertimos los espesores de cm a m
  const espRecalceM = parseInt(espesorRecalce) / 100;
  const espMuroM = parseInt(espesorMuro) / 100;

  const datosValidos =
    !isNaN(largo) && !isNaN(ancho) && !isNaN(alto) &&
    !isNaN(espRecalceM) && !isNaN(espMuroM) &&
    alto > espRecalceM;

  if (!datosValidos) {
    return <p>⚠️ Por favor completá correctamente los datos para calcular los volúmenes.</p>;
  }

  // 📏 Volúmenes
  const volumenRecalce = espRecalceM * espMuroM * ancho * largo;
  const volumenMuro = espMuroM * ancho * largo * (alto - espRecalceM);
  const volumenTotal = volumenRecalce + volumenMuro;

  // 📊 Calcular el tiempo total de ejecución por etapa
  const totalTroneras = lados.reduce((acc, lado) => acc + parseInt(lado.repeticiones), 0); // Sumar todas las troneras

  // Dividir troneras entre las 4 etapas
  const tronerasPorEtapa = Math.floor(totalTroneras / 4);
  const sobrantes = totalTroneras % 4;

  const distribucion = [tronerasPorEtapa, tronerasPorEtapa, tronerasPorEtapa, tronerasPorEtapa];

  // Distribuir las sobrantes
  for (let i = 0; i < sobrantes; i++) {
    distribucion[i]++;
  }

  // Ajustar el número de troneras por etapa
  const ordenTaludes = [1, 3, 2, 4];
  let tiempoTotalHoras = 0;
  let totalEsperaDias = 0;
  let totalDiasLaborales = 0;

  // Iterar sobre las etapas 1-3-2-4 y distribuir troneras por lado/ancho
  ordenTaludes.forEach((num, index) => {
    const lado = lados[num - 1]; // Porque los lados están en base 0
    if (lado && lado.ancho && lado.repeticiones) {
      const anchoLado = parseFloat(lado.ancho); // Convertir ancho de string a número
      const rep = distribucion[index]; // Usamos la distribución correcta de troneras por etapa

      // Volumen por tronera (para esa etapa)
      const volumenEtapa = espRecalceM * espMuroM * anchoLado * rep;
      
      // Calcular el tiempo total para esa etapa
      const tiempoHorasEtapa = (volumenEtapa / 3) * 6; // 3 grupos de trabajo, 6 horas por m³
      tiempoTotalHoras += tiempoHorasEtapa;

      // Cada etapa tiene una espera de 24 horas entre tramos
      totalEsperaDias += 2; // 2 días entre etapas

      // Cada tronera es de 1.5 m de altura máximo por día
      const tramosPorDia = Math.ceil(volumenEtapa / (1.5 * anchoLado)); // Dividir el volumen por tramos
      totalDiasLaborales += tramosPorDia + totalEsperaDias;
    }
  });

  // 🟨 Esquinas (etapa 5)
  let volumenEsquinas = 0;
  esquinas.forEach(esq => {
    const vol = parseFloat(esq.volumen);
    const rep = parseInt(esq.repeticiones);
    volumenEsquinas += vol * rep;
  });
  
  // Calculamos el tiempo para las esquinas
  const tiempoHorasEsquinas = (volumenEsquinas / 3) * 6;
  tiempoTotalHoras += tiempoHorasEsquinas;

  // Quitamos la espera después de la última etapa (esquinas)
  totalEsperaDias -= 2;

  const totalTiempoEnHoras = Math.ceil(tiempoTotalHoras);
  const tiempoTotalDias = totalTiempoEnHoras / 8 + totalEsperaDias;

  return (
    <div className="muro-container">
      <h3>🧱 Volumen de Mampostería</h3>
      <p><strong>Volumen del recalce:</strong> {volumenRecalce.toFixed(2)} m³</p>
      <p><strong>Volumen del muro medianero:</strong> {volumenMuro.toFixed(2)} m³</p>
      <hr />
      <p><strong>Volumen total:</strong> {volumenTotal.toFixed(2)} m³</p>

      <h3>⏱ Tiempo de ejecución del recalce</h3>
      <p><strong>Tiempo estimado (horas de trabajo):</strong> {tiempoTotalHoras.toFixed(1)} hs</p>
      <p><strong>Días laborales (8 hs):</strong> {Math.ceil(tiempoTotalHoras / 8)} días</p>
      <p><strong>Tiempo total con espera entre etapas:</strong> {tiempoTotalDias} días</p>

      <h3>🛠 Resumen por etapa:</h3>
      <ul>
        {ordenTaludes.map((num, index) => (
          <li key={index}>
            Etapa {num}: {distribucion[index]} troneras de {lados[num - 1]?.ancho}m
          </li>
        ))}
        <li>Etapa 5 (Esquinas): {volumenEsquinas.toFixed(2)} m³</li>
      </ul>
    </div>
  );
}

export default Muro;
