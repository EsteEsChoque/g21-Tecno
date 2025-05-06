import React, { useState } from 'react';
import Formularioasc from './Formularioasc'; // Importamos el formulario
import Bloques from './Bloques';

const AscensorPage = () => {
    const [pisosAltos, setPisosAltos] = useState(0);
    const [pisosBajos, setPisosBajos] = useState(0);
    const [altProm, setAltProm] = useState(0);
    const [bloques, setBloques] = useState([]);


    return (
        <div>
          <h1>Esta parte esta en proceso</h1>
          <h1>Facil de romper con cualquier cosa</h1>

            <h1>Gestión de Ascensores</h1>
            <Formularioasc 
            pisosAltos={pisosAltos}
            setPisosAltos={setPisosAltos}
            pisosBajos={pisosBajos}
            setPisosBajos={setPisosBajos}
            altProm={altProm}
            setAltProm={setAltProm}
            bloques={bloques}
            setBloques={setBloques}
          />

           <h3>Bloques</h3>
            <Bloques  
            bloques={bloques} 
            setBloques={setBloques} 

            pisosAltos ={ pisosAltos}
            pisosBajos ={pisosBajos}
            altProm ={altProm}
            />
        </div>
    );
};

export default AscensorPage;
