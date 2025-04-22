import React from 'react';

function Muro({ largo, ancho, alto, espesorRecalce, espesorMuro, lados, esquinas }) {
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

  // 🔄 Volumen por lado (orden: 1 - 3 - 2 - 4)
  const ordenTaludes = [1, 3, 2, 4];
  let tiempoTotalHoras = 0;
  let totalEsperaDias = 0;

  ordenTaludes.forEach(num => {
    const lado = lados[num - 1]; // Porque los lados están en base 0
    if (lado && lado.ancho && lado.repeticiones) {
      const anchoLado = parseFloat(lado.ancho);
      const rep = parseInt(lado.repeticiones);
      const volumenEtapa = espRecalceM * espMuroM * anchoLado * rep;

      const tiempoHorasEtapa = (volumenEtapa / 3) * 6;
      tiempoTotalHoras += tiempoHorasEtapa;
      totalEsperaDias += 2; // 2 días entre etapas
    }
  });

  // 🟨 Esquinas (etapa 5)
  let volumenEsquinas = 0;
  esquinas.forEach(esq => {
    const vol = parseFloat(esq.volumen);
    const rep = parseInt(esq.repeticiones);
    volumenEsquinas += vol * rep;
  });
  const tiempoHorasEsquinas = (volumenEsquinas / 3) * 6;
  tiempoTotalHoras += tiempoHorasEsquinas;

  // Quitamos la espera después de la última etapa (esquinas)
  totalEsperaDias -= 2;

  const totalDiasLaborales = Math.ceil(tiempoTotalHoras / 8);
  const tiempoTotalDias = totalDiasLaborales + totalEsperaDias;

  return (
    <div className="muro-container">
      <h3>🧱 Volumen de Mampostería</h3>
      <p><strong>Volumen del recalce:</strong> {volumenRecalce.toFixed(2)} m³</p>
      <p><strong>Volumen del muro medianero:</strong> {volumenMuro.toFixed(2)} m³</p>
      <hr />
      <p><strong>Volumen total:</strong> {volumenTotal.toFixed(2)} m³</p>

      <h3>⏱ Tiempo de ejecución del recalce</h3>
      <p><strong>Tiempo estimado (horas de trabajo):</strong> {tiempoTotalHoras.toFixed(1)} hs</p>
      <p><strong>Días laborales (8 hs):</strong> {totalDiasLaborales} días</p>
      <p><strong>Tiempo total con espera:</strong> {tiempoTotalDias} días</p>
    </div>
  );
}

export default Muro;
