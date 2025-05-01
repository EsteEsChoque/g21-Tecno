import React, { useEffect } from 'react';
import './ModalAyuda.css';

function ModalAyuda({ mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000); // ⏱️ 10 segundos

    return () => clearTimeout(timer); // limpiamos si se desmonta antes
  }, [onClose]);

  return (
    <div className="modal-ayuda-overlay">
      <div className="modal-ayuda">
        <button className="modal-ayuda-cerrar" onClick={onClose}>×</button>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

export default ModalAyuda;
