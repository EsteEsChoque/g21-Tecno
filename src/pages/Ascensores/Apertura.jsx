import React from 'react';

const Apertura = ({ bloque, index, actualizarBloque }) => {

  const calcularTiempoAperturaCierre = (tipoApertura, luzLibre, tipoAperturaAutomatica) => {
    if (tipoApertura === 'manual') {
      return 6;  
    }

    const tiemposAutomaticos = {
      '0.80': {
        'unaHoja': 4.0,
        'dosHojasUnilateral': 3.6,
        'dosHojasBilateral': 2.7,
      },
      '0.90': {
        'unaHoja': 4.1,
        'dosHojasUnilateral': 3.8,
        'dosHojasBilateral': 3.0,
      },
      '1.00': {
        'unaHoja': 4.6,
        'dosHojasUnilateral': 4.2,
        'dosHojasBilateral': 3.8,
      },
      '1.20': {
        'unaHoja': 4.9,
        'dosHojasUnilateral': 4.3,
        'dosHojasBilateral': 4.0,
      },
    };

    const tiempoCierre = tiemposAutomaticos[luzLibre] && tiemposAutomaticos[luzLibre][tipoAperturaAutomatica];

    return tiempoCierre || 0;  
  };
  const determinarTipoCabina = (personas) => {
    if (personas <= 5) return '0';
    if (personas <= 8) return '1';
    if (personas <= 10) return '2';
    if (personas >= 11) return '3';
    return ''; // Si no hay un rango adecuado
  };
  

  return (
    <div>
         <label>
                    Personas a Llevar:
                    <input 
                        type="text" 
                        value={bloque.personas || ''} 
                        onChange={(e) => {
                        // Filtra caracteres que no sean números
                        const value = e.target.value.replace(/[^0-9]/g, ''); 
                        actualizarBloque(index, 'personas', value ? Number(value) : ''); // Actualiza solo con números
                        }}
                        inputMode="numeric"
                    />
                    </label>
        <label>
            Tipo de Cabina:
            <input
                type="text"
                value={bloque.tipoCabina || determinarTipoCabina(bloque.personas)} // Asigna el tipo de cabina basado en las personas
                onChange={(e) => actualizarBloque(index, 'tipoCabina', e.target.value)}
                disabled
            />
        </label>
        
      <label>
        Tipo de Apertura:
        <select 
          value={bloque.tipoApertura || ''}
          onChange={(e) => actualizarBloque(index, 'tipoApertura', e.target.value)}
        >
          <option value="">Seleccionar tipo de apertura</option>
          <option value="manual">Manual</option>
          <option value="automatico">Automático</option>
        </select>
      </label>

      <label>
        Tiempo de Apertura y Cierre:
        <input
          type="number"
          value={(bloque.tipoApertura === 'manual' ? 6 : '') || bloque.tempoAperturaCierre} 
          onChange={(e) => actualizarBloque(index, 'tempoAperturaCierre', Number(e.target.value))}
          disabled={bloque.tipoApertura === 'manual'} 
        />
      </label>

      {bloque.tipoApertura === 'automatico' && (
        <>
          <label>
            Tipo de Apertura Automática:
            <select
              value={bloque.tipoAperturaAutomatica || ''}
              onChange={(e) => {
                const nuevoTipo = e.target.value;
                actualizarBloque(index, 'tipoAperturaAutomatica', nuevoTipo);
                const tiempoCalculado = calcularTiempoAperturaCierre(bloque.tipoApertura, bloque.luzLibre, nuevoTipo);
                actualizarBloque(index, 'tempoAperturaCierre', tiempoCalculado);
              }}
            >
              <option value="">Seleccionar tipo de apertura</option>
              <option value="unaHoja">Una hoja</option>
              <option value="dosHojasUnilateral">Dos hojas unilateral</option>
              <option value="dosHojasBilateral">Dos hojas bilateral</option>
            </select>
          </label>

          <label>
            Luz Libre:
            <select
              value={bloque.luzLibre || ''}
              onChange={(e) => {
                const nuevaLuzLibre = e.target.value;
                actualizarBloque(index, 'luzLibre', nuevaLuzLibre);
                const tiempoCalculado = calcularTiempoAperturaCierre(bloque.tipoApertura, nuevaLuzLibre, bloque.tipoAperturaAutomatica);
                actualizarBloque(index, 'tempoAperturaCierre', tiempoCalculado);
              }}
            >
              <option value="">Seleccionar luz libre</option>
              <option value="0.80">0.80 m</option>
              <option value="0.90">0.90 m</option>
              <option value="1.00">1.00 m</option>
              <option value="1.20">1.20 m</option>
            </select>
          </label>
        </>
      )}
    </div>
  );
};

export default Apertura;
