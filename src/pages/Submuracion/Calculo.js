import React, { useEffect, useState } from 'react';

function Calculo({ 
  volumenOriginal, 
  coeficiente, 
  volumenCimiento, 
  coeficienteComp, 
  angulo,
  ancho, 
  alto, 
  largo,
  banquina,
  lados,
  esquinas,
  superficieLados,
  setSuperficieLados,
  superficieEsquina,
  setSuperficieEsquina,
  setVolumenCompensado, 
  setVolumenCentroCompensado}) {
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

  const radianes = angulo * Math.PI / 180;
  const adyacente = alto / Math.tan(radianes);
  const baseMenor = banquina;
  const baseMayor = adyacente + banquina;
  const areaTrapecio = ((baseMenor + baseMayor) / 2) * alto;

  const volumen = ((superficieLados + superficieEsquina)).toFixed(2)
  const volumen1 = (volumen*coeficienteComp).toFixed(2)
  const volumenCen = (largo*ancho*alto) - volumen
  const volumenCen1 = (volumenCen*coeficienteComp).toFixed(2)

    
  
  useEffect(() => {
    const totalVolumen = lados.reduce((acum, lado) => {
      const anchoNum = parseFloat(lado.ancho);
      const repeticiones = parseInt(lado.repeticiones);
      const volumenLado = anchoNum * areaTrapecio * repeticiones;
      return acum + volumenLado;
    }, 0);

    setSuperficieLados(totalVolumen);
  }, [lados, areaTrapecio, setSuperficieLados]);
  

  useEffect(() => {
    const totalEsquinas = esquinas.reduce((acum, esquina) => {
      const rep = parseInt(esquina.repeticiones);
      const vol = parseFloat(esquina.volumen);
      return acum + (rep * vol);
    }, 0);

    setSuperficieEsquina(totalEsquinas);
  }, [esquinas, setSuperficieEsquina]);

  useEffect(() => {
    const volumenTotal = superficieLados + superficieEsquina;
  
    const volumen = volumenTotal.toFixed(2);
    const volumen1 = (volumenTotal * coeficienteComp).toFixed(2);
  
    const volumenCen = (largo * ancho * alto) - volumenTotal;
    const volumenCen1 = (volumenCen * coeficienteComp).toFixed(2);
  
    setVolumenCompensado(Number(volumen1));
    setVolumenCentroCompensado(Number(volumenCen1));
  }, [
    superficieLados, 
    superficieEsquina, 
    largo, 
    ancho, 
    alto, 
    coeficienteComp, 
    setVolumenCompensado, 
    setVolumenCentroCompensado
  ]);
  

  
  
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

      <div>
      <h4>Volumen de esquinas</h4>
      {esquinas.map((esquina, i) => {
        const repeticiones = parseInt(esquina.repeticiones);
        const volumenUnitario = parseFloat(esquina.volumen);
        const volumenTotal = volumenUnitario * repeticiones;

        return (
          <div key={i}>
            <p><strong>Esquina #{i + 1}</strong></p>
            <p>Volumen unitario: {volumenUnitario} m³</p>
            <p>Repeticiones: {repeticiones}</p>
            <p>Volumen Total: {volumenTotal.toFixed(2)} m³</p>
            <hr />
          </div>
        );
      })}

      <h4>Volumen total acumulado de esquinas: {superficieEsquina.toFixed(2)} m³</h4>
     
    </div>


      <div>
      <h4>Volumen de Talud</h4>
      {lados.map((lado, i) => {
        const anchoNum = parseFloat(lado.ancho);
        const repeticiones = parseInt(lado.repeticiones);
        const volumenLado = anchoNum * areaTrapecio * repeticiones;

        return (
          <div key={i}>
            <p><strong>Lado #{i + 1}</strong></p>
            <p>Ancho: {anchoNum} m</p>
            <p>Repeticiones: {repeticiones}</p>
            <p>Volumen Total: {volumenLado.toFixed(2)} m³</p>
            <hr />
          </div>
        );
      })}

      <h4>Volumen total acumulado de lados: {superficieLados.toFixed(2)} m³</h4>
    </div>
    <div  className="volumenTotal">

    <h4>Volumen total lados + esquinas: {volumen} m³</h4>
    <h4>Volumen total + Esponjamiento: {volumen1} m³</h4>
    <h4>Volumen Central: {volumenCen} m³</h4>
    <h4>Volumen Central + Esponjamiento: {volumenCen1} m³</h4>
    </div>
      <p></p>

        <hr></hr>

    </div>
  );
}

export default Calculo;
