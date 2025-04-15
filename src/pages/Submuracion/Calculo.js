import React from 'react';

function Calculo({ volumenOriginal, coeficiente, volumenCimiento, coeficienteComp, ancho, alto, largo }) {
  // Convertir el coeficiente a un número decimal
  const coefDecimal = parseFloat(coeficiente) / 100;

  // Calcular el esponjamiento (volumen original * coeficiente de esponjamiento)
  const volumenEsp = volumenOriginal * (1 + coefDecimal); // Multiplicamos por (1 + coefDecimal) para obtener el volumen esponjado

  // Calcular el volumen a rellenar (volumen original - volumen del cimiento)
  const volumenRellenar = volumenOriginal - volumenCimiento;

  // Calcular el volumen a compactar
  const volumenCompactar = volumenRellenar * coeficienteComp;

  // Calcular el volumen sobrante o a retirar (esponjamiento - volumen compactado)
  const volumenSobrante = volumenEsp - volumenCompactar;

  const volumenRellenarFinal = Math.floor((volumenEsp - volumenRellenar))   ;
  
  console.log(coeficienteComp,"-------------------");
  
  
  return (
    <div>
      <h3>Cálculos</h3>

      {/* Cálculo de esponjamiento */}
      <div>
        <h4>Cálculo de Esponjamiento</h4>
        <p>Vo (Volumen original) = b x h x l (ancho x alto x largo)</p>
        <p>Vo = {ancho} m x {alto} m x {largo} m</p>
        <p>Vo = {volumenOriginal} m³</p>
        <p>V esp = Vo x Coef. --------------- donde el Coef. es 1.{parseFloat(coeficiente)}</p>
        <p>V esp = {volumenOriginal} x 1.{parseFloat(coeficiente)}</p>
        <p>V esp = {volumenEsp.toFixed(2)} m³</p>
      </div>

      <hr />

      {/* Cálculo de volumen a rellenar */}
      <div>
        <h4>Cálculo de Volumen a Retirar</h4>
        <p>Vc (Volumen del cimiento) = b x h x l (ancho x alto x largo )</p>
        <p>Vo = {ancho} m x {alto} m x {largo} m =  {Math.floor(volumenEsp.toFixed(2))} m³ </p>
        <p>V a rellenar = Vo – V c = {volumenEsp.toFixed(2)} m³ - {volumenOriginal} m³  </p>
        <p>V a rellenar = {volumenRellenarFinal} m³</p>
        <p>V a compactar = V a rell x Coef. Comp. </p>
        <p>V a compactar = {volumenRellenarFinal} m³ x {coeficienteComp} = {Math.floor(coeficienteComp*volumenRellenarFinal)}  m³</p>
        <p>V sobrante o a retirar = {volumenEsp.toFixed(2)} m³ - {Math.floor(coeficienteComp*volumenRellenarFinal)}  m³ = {Math.floor(volumenEsp.toFixed(2)-(coeficienteComp*volumenRellenarFinal))}  m³</p>
      </div>

      <hr />

    </div>
  );
}

export default Calculo;
