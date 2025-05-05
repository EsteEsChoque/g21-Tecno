import React from 'react';

const Bloques = ({ 
    bloques, setBloques,
    pisosAltos,
    pisosBajos,
    altProm,
}) => {
  // Agrega un nuevo bloque al array
  const agregarBloque = () => {
    setBloques([
      ...bloques,
      {
        area: '',
        tipo: '',
        primerPiso: '',
        ultimoPiso: ''
      }
    ]);
  };
// Para último piso (de 0 a pisosAltos)
const opcionesPisos = Array.from(
    { length: pisosAltos + pisosBajos + 1 },
    (_, i) => -pisosBajos + i
  );

  const opcionesUltimoPisoFiltradas = opcionesPisos.filter(
    (piso) => piso >= bloques.primerPiso
  );
  
  
  

  // Actualiza un campo específico de un bloque
  const actualizarBloque = (index, campo, valor) => {
    const nuevos = [...bloques];
    nuevos[index][campo] = valor;
    setBloques(nuevos);
  };
  console.log(pisosBajos);
  return (
    <div>
      <button type="button" onClick={agregarBloque}>+ Agregar Bloque</button>

      {bloques.map((bloque, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h4>Bloque #{index + 1}</h4>

          <label>
            Área m²:
            <input 
              type="text" 
              value={bloque.area}
              onChange={(e) => actualizarBloque(index, 'area', e.target.value)}
            />
          </label>

          <label>
            Tipo:
            <select 
                value={bloque.tipo}
                onChange={(e) => actualizarBloque(index, 'tipo', e.target.value)}
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


            <label>
            Primer Piso:
            <select
                value={bloque.primerPiso}
                onChange={(e) => actualizarBloque(index, 'primerPiso', Number(e.target.value))}
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
                onChange={(e) => actualizarBloque(index, 'ultimoPiso', Number(e.target.value))}
            >
                <option value="">Seleccionar piso</option>
                {opcionesUltimoPisoFiltradas.map((piso) => (
                <option key={piso} value={piso}>
                    {piso === 0 ? 'Planta Baja (0)' : piso}
                </option>
                ))}
            </select>
            </label>




        </div>
      ))}
    </div>
  );
};

export default Bloques;
