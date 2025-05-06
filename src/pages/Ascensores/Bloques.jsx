import React from 'react';
import './Formulario.css';
import './Apertura';
import Apertura from './Apertura';

const Bloques = ({ bloques, setBloques, pisosAltos, pisosBajos }) => {
  // Agrega un nuevo bloque al array
  const agregarBloque = () => {
    setBloques([
      ...bloques,
      {
        area: '',
        tipo: '',
        primerPiso: '',
        ultimoPiso: '',
        poblacion: '',
        velocidad: '',
        personas:'',
        cantidad: '',
        tipoCabina: '',
        tipoApertura: '',
        tipoAperturaAutomatica: '',
        luzLibre: '',
      }
    ]);
  };

  // Para último piso (de 0 a pisosAltos)
  const opcionesPisos = Array.from(
    { length: pisosAltos + pisosBajos + 1 },
    (_, i) => -pisosBajos + i
  );

  // Función para calcular la velocidad por defecto según el número de pisos
  const calcularVelocidad = (primerPiso, ultimoPiso) => {
    const numPisos = Math.abs(ultimoPiso - primerPiso);

    if (numPisos >= 1 && numPisos <= 2) {
      return 30; // Velocidad mínima de 1 a 2 pisos
    } else if (numPisos >= 3 && numPisos <= 5) {
      return 45; // Velocidad mínima de 3 a 5 pisos
    } else if (numPisos >= 6 && numPisos <= 10) {
      return 75; // Velocidad mínima de 6 a 10 pisos
    } else if (numPisos >= 11 && numPisos <= 16) {
      return 90; // Velocidad mínima de 11 a 16 pisos
    } else if (numPisos >= 17 && numPisos <= 25) {
      return 150; // Velocidad mínima de 17 a 25 pisos
    } else if (numPisos >= 26 && numPisos <= 35) {
      return 180; // Velocidad mínima de 26 a 35 pisos
    } else if (numPisos >= 36 && numPisos <= 45) {
      return 210; // Velocidad mínima de 36 a 45 pisos
    } else if (numPisos >= 46 ) {
      return 300; // Velocidad mínima de 46 a 60 pisos
    } else {
      return 0; // En caso de que no esté en un rango válido
    }
  };

  const calcularPisos = (primerPiso, ultimoPiso) => {
    const numPisos = Math.abs(ultimoPiso - primerPiso); 
    return numPisos;
  };


  // Actualiza un campo específico de un bloque
  const actualizarBloque = (index, campo, valor) => {
    const nuevos = [...bloques];
    nuevos[index][campo] = valor;
    setBloques(nuevos);
  };

  // Filtra las opciones del último piso dependiendo del primer piso seleccionado
  const opcionesUltimoPisoFiltradas = (primerPiso) => {
    return opcionesPisos.filter((piso) => piso >= primerPiso);
  };

  // Verifica si se debe deshabilitar los campos (si bloque.poblacion tiene valor mayor a 0)
  const deshabilitarCampos = (poblacion) => poblacion > 0;

  return (
    <div className="formulario">
      <button type="button" onClick={agregarBloque}>+ Agregar Bloque</button>

      {bloques.map((bloque, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h4>Bloque #{index + 1}</h4>
          
          <label>
            Población:
            <input 
              type="number"
              value={bloque.poblacion}
              onChange={(e) => actualizarBloque(index, 'poblacion', Number(e.target.value))}
            />
          </label>

          <label>
            Área m²:
            <input 
              type="text" 
              value={bloque.area}
              onChange={(e) => actualizarBloque(index, 'area', e.target.value)}
              disabled={deshabilitarCampos(bloque.poblacion)} // Deshabilitar si bloque.poblacion tiene valor mayor a 0
            />
          </label>

          <label>
            Tipo:
            <select 
                value={bloque.tipo}
                onChange={(e) => actualizarBloque(index, 'tipo', e.target.value)}
                disabled={deshabilitarCampos(bloque.poblacion)} // Deshabilitar si bloque.poblacion tiene valor mayor a 0
            >
                <option value="">Seleccione tipo de uso</option>
                <option value="Auditorios, Salas de baile, Sitios de asamblea">Auditorios, Salas de baile, Sitios de asamblea</option>
                <option value="Edificios para educación">Edificios para educación</option>
                <option value="Oficinas, Bancos, Bibliotecas, Clínicas">Oficinas, Bancos, Bibliotecas, Clínicas</option>
                <option value="Viviendas colectivas y Hoteles">Viviendas colectivas y Hoteles</option>
                <option value="En industrias cuando el número de ocupantes no es declarado por el usuario">En industrias cuando el número de ocupantes no es declarado por el usuario</option>
                <option value="Locales, Mercados, Museo, Sala exposición o Restaurantes">Locales, Mercados, Museo, Sala exposición o Restaurantes</option>
                <option value="Gimnasios, Pista de patinaje, Cancha de bolos, salón de billares">Gimnasios, Pista de patinaje, Cancha de bolos, salón de billares</option>
            </select>
           
          </label>
            <Apertura
                bloque={bloque}
                index={index}
                actualizarBloque={actualizarBloque}
            />
    
          <label>
            Cantidad de Ascensores:
            <input 
                type="text"  // Usamos 'text' para evitar la entrada de caracteres no deseados
                value={bloque.cantidad || ''} // Usa un valor vacío si no hay valor para 'personas'
                onChange={(e) => {
                // Filtra caracteres que no sean números
                const value = e.target.value.replace(/[^0-9]/g, ''); 
                actualizarBloque(index, 'cantidad', value ? Number(value) : ''); // Actualiza solo con números
                }}
                inputMode="numeric" // Esto ayuda en dispositivos móviles a mostrar un teclado numérico
            />
            </label>



          <label>
            Primer Piso:
            <select
                value={bloque.primerPiso}
                onChange={(e) => {
                  // Al cambiar el primer piso, reseteamos el último piso
                  actualizarBloque(index, 'primerPiso', Number(e.target.value));
                  actualizarBloque(index, 'ultimoPiso', ''); // Resetea el último piso a vacío
                }}
            >
                <option value="">Seleccionar piso</option>
                {opcionesPisos.map((piso) => (
                <option key={piso} value={piso}>
                    {piso === 0 ? 'Planta Baja (0)' : piso}
                </option>
                ))}
            </select>
          </label>

          <label>
            Último Piso:
            <select
                value={bloque.ultimoPiso}
                onChange={(e) => {
                const ultimoPiso = Number(e.target.value);
                // Actualiza el valor de último piso
                actualizarBloque(index, 'ultimoPiso', ultimoPiso);
                // Recalcula la velocidad automáticamente al cambiar el último piso
                const nuevaVelocidad = calcularVelocidad(bloque.primerPiso, ultimoPiso);
                // Actualiza la velocidad del bloque
                actualizarBloque(index, 'velocidad', nuevaVelocidad);
                }}
            >
                <option value="">Seleccionar piso</option>
                {opcionesUltimoPisoFiltradas(bloque.primerPiso).map((piso) => (
                <option key={piso} value={piso}>
                    {piso === 0 ? 'Planta Baja (0)' : piso}
                </option>
                ))}
            </select>
            </label>

            <label>
            Velocidad del Ascensor (mts/min):
            <input 
                type="number"
                step="1"
                value={bloque.velocidad || calcularVelocidad(bloque.primerPiso, bloque.ultimoPiso)} // Velocidad por defecto
                onChange={(e) => actualizarBloque(index, 'velocidad', Number(e.target.value))}
                disabled={deshabilitarCampos(!bloque.ultimoPiso)} // Deshabilitar si bloque.poblacion tiene valor mayor a 0
            />
            {bloque.primerPiso && bloque.ultimoPiso && (
                <span> - Cantidad de pisos: {calcularPisos(bloque.primerPiso, bloque.ultimoPiso)}</span>
            )}
            </label>

        </div>
      ))}
    </div>
  );
};

export default Bloques;
