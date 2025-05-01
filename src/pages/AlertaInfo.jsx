import React, { useState } from 'react';
import './AlertaInfo.css';

function AlertaInfo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={() => setVisible(false)}>×</button>
        <h2>👋 ¡Hola!</h2>
        <p>
          Yo soy <strong>Choque</strong>, el creador de esta página.<br />
          Este sitio está en desarrollo, así que si ves errores o tenés dudas, escribime sin problema.<br />
          Usá esta página como guía, no como una versión definitiva.<br /><br />
          📩 Contacto: <strong>11 2391 8686</strong><br /><br />
          Pd: No spam plis
        </p>
      </div>
    </div>
  );
}

export default AlertaInfo;
