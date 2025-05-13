import React, { useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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
  const coefDecimal2 = coefDecimal + 1;
 

  // Calcular el esponjamiento (volumen original * coeficiente de esponjamiento)
  const volumenEsp = volumenOriginal * (1 + coefDecimal); // Multiplicamos por (1 + coefDecimal) para obtener el volumen esponjado


  const radianes = angulo * Math.PI / 180;
  const adyacente = alto / Math.tan(radianes);
  const baseMenor = banquina;
  const baseMayor = (adyacente + banquina).toFixed(1);
  const areaTrapecio = ((parseFloat(baseMenor) + parseFloat(baseMayor)) / 2) * parseFloat(alto);
console.log(areaTrapecio,"-----------------");

  const volumen = ((superficieLados + superficieEsquina)).toFixed(1)
  const volumen1 = (volumen*coefDecimal2).toFixed(1)
  const volumenCen = ((largo*ancho*alto) - volumen).toFixed(1)
  const volumenCen1 = (volumenCen*coefDecimal2).toFixed(1)

    
  
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
      const lad1 = parseFloat(esquina.lado1Ancho);
      const lad2 = parseFloat(esquina.lado2Ancho);
      return acum + (rep * (lad1+lad2)*alto);
    }, 0);

    setSuperficieEsquina(totalEsquinas);
  }, [esquinas, setSuperficieEsquina,alto]);

  useEffect(() => {
    const volumenTotal = superficieLados + superficieEsquina;
  
    const volumen = volumenTotal.toFixed(1);
    const volumen1 = (volumen * coefDecimal2).toFixed(1);
  
    const volumenCen = ((largo * ancho * alto) - volumenTotal).toFixed(1);
    const volumenCen1 = (volumenCen * coefDecimal2).toFixed(1);
  
    setVolumenCompensado(Number(volumen1));
    setVolumenCentroCompensado(Number(volumenCen1));
  }, [
    superficieLados, 
    superficieEsquina, 
    largo, 
    ancho, 
    alto, 
    coefDecimal2, 
    setVolumenCompensado, 
    setVolumenCentroCompensado
  ]);
  

  useEffect(() => {
    const formulaElement = document.getElementById('formula');
    katex.render(
      '\\frac{B + b}{2} \\times \\text{Altura} \\times \\text{Largo} = Vtr',
      formulaElement
    );
  }, []);
  
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

     

      <div>
      <h4>Volumen de esquinas</h4>
      {esquinas.map((esquina, i) => {
        const repeticiones = parseInt(esquina.repeticiones);
        const volumenLado1 = parseFloat(esquina.lado1Ancho);
        const volumenLado2 = parseFloat(esquina.lado2Ancho);
        const volumenUnitario =volumenLado1  * volumenLado2 * alto;
        const volumenTotal =volumenUnitario  * repeticiones;

        return (
          <div key={i}>
            <p><strong>Esquina #{i + 1}</strong></p>
            <p>Volumen unitario: Lado x ancho x alto³</p>
            <p>Volumen unitario: {parseFloat(esquina.lado1Ancho)}m x {parseFloat(esquina.lado1Ancho)}m x {alto}m</p>
            <p>Volumen unitario: {volumenUnitario} m³</p>
            <p>Repeticiones: {repeticiones}</p>
            <p>Volumen Total: {volumenTotal.toFixed(1)} m³</p>
            
          </div>
        );
      })}

      <h4>Volumen total acumulado de esquinas: {superficieEsquina.toFixed(1)} m³</h4>
      <hr />
    </div>

      <div>
      <h4>Volumen de Talud</h4>
      {lados.map((lado, i) => {
        const anchoNum = parseFloat(lado.ancho);
        const repeticiones = parseInt(lado.repeticiones);
        const volumenLado = anchoNum * areaTrapecio;
        const volumenTotal =volumenLado * repeticiones;
        const VT = volumenTotal.toFixed(1)
        const formula = `\\frac{(${baseMenor} + ${baseMayor})}{2} \\times \\text ${alto} \\times \\text${lado.ancho} = ${volumenLado.toFixed(1)} m³`;
        return (
          <div key={i}>
            <h5>Volumen de prisma trapezoidal {i+1}</h5>
            <div id="formula"></div>
            <div key={i} dangerouslySetInnerHTML={{ __html: katex.renderToString(formula) }} />
            <p>Repeticiones: {repeticiones}</p>
            <p>Volumen Total: {VT} m³</p>
            
          </div> 
        );
      })}

      <h4>Volumen total acumulado de lados: {superficieLados.toFixed(1)} m³</h4>
      <hr />
    </div>
      <div  className="volumenTotal">
      <h4>Coeficiente de Esponjamiento: {coeficiente}</h4>
      <h4>Volumen total lados + esquinas: {volumen} m³</h4>
      <h4>Volumen Central: {volumenCen} m³</h4>
      <h4>Volumen lados + Esponjamiento: {volumen1} m³</h4>
      <h4>Volumen Central + Esponjamiento: {volumenCen1} m³</h4>
    </div>
      <p></p>

        <hr></hr>

    </div>
  );
}

export default Calculo;
