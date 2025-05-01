import React from 'react';

function Costo({
  volumenCompensado,
  volumenCentroCompensado,
  costom3,
  costom3h,
  camiones,
  camionesCosto,
  costomMamposteria,
  costoRecalce,
  espesorMuro,
  espesorRecalce,
  alto,
  largo,
  ancho
}) {
  const vPerimetral = parseFloat(volumenCompensado);
  const vCentral = parseFloat(volumenCentroCompensado);
  const precioMovimiento = parseFloat(costom3);
  const precioMovimientoH = parseFloat(costom3h);
  const capacidadCamion = parseFloat(camiones);
  const precioCamion = parseFloat(camionesCosto);

  const datosValidos =
    !isNaN(vPerimetral) &&
    !isNaN(vCentral) &&
    !isNaN(precioMovimiento) &&
    !isNaN(precioMovimientoH) &&
    !isNaN(precioCamion) &&
    !isNaN(capacidadCamion) &&
    capacidadCamion > 0;

  if (!datosValidos) {
    return <p>⚠️ Por favor completá todos los campos de costos y transporte para ver el cálculo.</p>;
  }

  // Movimiento de tierra
  const costoMovimientoCentral = vCentral * precioMovimiento;
  const costoMovimientoPerimetral = vPerimetral * precioMovimientoH;


  // Transporte
  const camionesCentral = Math.ceil(vCentral / capacidadCamion);
  const camionesPerimetral = Math.ceil(vPerimetral / capacidadCamion);

  const costoTransporteCentral = vCentral * precioCamion;
  const costoTransportePerimetral = vPerimetral * precioCamion;

  // Totales
  const volumenTotal = vCentral + vPerimetral;
  const costoMovimientoTotal = costoMovimientoCentral + costoMovimientoPerimetral;
  const costoTransporteTotal = costoTransporteCentral + costoTransportePerimetral;
  const camionesTotal = camionesCentral + camionesPerimetral;
  
  //muro
  const espesor = espesorRecalce/100
  const altoMuro = alto - espesor
  const largoM = (largo*2) + (ancho*2)
  const m3M = (espesorMuro/100)* altoMuro * largoM 
  const costoMuro = m3M * costomMamposteria
  
  const m3R = (espesorMuro/100)*(espesorRecalce/100) * largoM 
  const costoR = m3R * costoRecalce
  const costoTotal = costoMovimientoTotal + costoTransporteTotal + costoMuro + costoR;
  return (
    <div className="costos-container">
      <h3>Cálculo de Costos</h3>

      <h4>Área central</h4>
      <p>Volumen: {vCentral.toFixed(1)} m³</p>
      <p>Movimiento de tierra: ${costoMovimientoCentral.toLocaleString(1)}</p>
      <p>Camiones necesarios: {camionesCentral}</p>
      <p>Transporte: ${costoTransporteCentral.toLocaleString(1)}</p>

      <h4>Área perimetral (troneras)</h4>
      <p>Volumen: {vPerimetral.toFixed(1)} m³</p>
      <p>Movimiento de tierra: ${costoMovimientoPerimetral.toLocaleString(1)}</p>
      <p>Camiones necesarios: {camionesPerimetral}</p>
      <p>Transporte: ${costoTransportePerimetral.toLocaleString(1)}</p>

      <h4>Costo muro perimetral Submuración</h4>
      <p>Espesor : {espesorMuro}cm</p>
      <p>Alto : {altoMuro}m</p>
      <p>Largo : {largoM}m</p>
      <p>{m3M.toLocaleString(1)} m³</p>
      <p> Costo del muro : ${costoMuro.toLocaleString(1)}</p>

      <h4>Costo del Recalce</h4>
      <p>Espesor : {espesorMuro}cm</p>
      <p>Alto : {espesorRecalce}cm  </p>
      <p>Largo : {largoM}m</p>
      <p>{m3R.toLocaleString(1)} m³</p>
      <p> Costo del Recalce : ${costoR.toLocaleString(1)}</p>
      <hr />

      <h4>Total general</h4>
      <p>Total camiones: {camionesTotal}</p>
      <p>Área central</p>
      <p>Movimiento de tierra: ${costoMovimientoCentral.toLocaleString(1)}</p>
      <p>Transporte: ${costoTransporteCentral.toLocaleString(1)}</p>
      <p>Área perimetral (troneras)</p>
      <p>Movimiento de tierra: ${costoMovimientoPerimetral.toLocaleString(1)}</p>
      <p>Transporte: ${costoTransportePerimetral.toLocaleString(1)}</p>
      <p>Muro</p>
      <p> Costo del muro : ${costoMuro.toLocaleString(1)}</p>
      <p>Recalce</p>
      <p> Costo del Recalce : ${costoR.toLocaleString(1)}</p>
      <p><strong>Costo total: ${costoTotal.toLocaleString(1)}</strong></p>
      <hr />
    </div>
  );
}

export default Costo;
