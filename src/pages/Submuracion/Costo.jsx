import React from 'react';

function Costo({
  volumenCompensado,
  volumenCentroCompensado,
  costom3,
  camiones,
  camionesCosto
}) {
  const vPerimetral = parseFloat(volumenCompensado);
  const vCentral = parseFloat(volumenCentroCompensado);
  const precioMovimiento = parseFloat(costom3);
  const capacidadCamion = parseFloat(camiones);
  const precioCamion = parseFloat(camionesCosto);

  const datosValidos =
    !isNaN(vPerimetral) &&
    !isNaN(vCentral) &&
    !isNaN(precioMovimiento) &&
    !isNaN(precioCamion) &&
    !isNaN(capacidadCamion) &&
    capacidadCamion > 0;

  if (!datosValidos) {
    return <p>⚠️ Por favor completá todos los campos de costos y transporte para ver el cálculo.</p>;
  }

  // Movimiento de tierra
  const costoMovimientoCentral = vCentral * precioMovimiento;
  const costoMovimientoPerimetral = vPerimetral * precioMovimiento;

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
  const costoTotal = costoMovimientoTotal + costoTransporteTotal;

  return (
    <div className="costos-container">
      <h3>Cálculo de Costos</h3>

      <h4>Área central</h4>
      <p>Volumen: {vCentral.toFixed(2)} m³</p>
      <p>Movimiento de tierra: ${costoMovimientoCentral.toLocaleString()}</p>
      <p>Camiones necesarios: {camionesCentral}</p>
      <p>Transporte: ${costoTransporteCentral.toLocaleString()}</p>

      <h4>Área perimetral (troneras)</h4>
      <p>Volumen: {vPerimetral.toFixed(2)} m³</p>
      <p>Movimiento de tierra: ${costoMovimientoPerimetral.toLocaleString()}</p>
      <p>Camiones necesarios: {camionesPerimetral}</p>
      <p>Transporte: ${costoTransportePerimetral.toLocaleString()}</p>

      <hr />

      <h4>Total general</h4>
      <p>Volumen total: {volumenTotal.toFixed(2)} m³</p>
      <p>Total movimiento de tierra: ${costoMovimientoTotal.toLocaleString()}</p>
      <p>Total camiones: {camionesTotal}</p>
      <p>Total transporte: ${costoTransporteTotal.toLocaleString()}</p>
      <p><strong>Costo total estimado: ${costoTotal.toLocaleString()}</strong></p>
    </div>
  );
}

export default Costo;
