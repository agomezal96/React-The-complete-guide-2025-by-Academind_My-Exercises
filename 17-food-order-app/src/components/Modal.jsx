import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current; //se recomienda esté enfoque porque la función de limpieza se va a ejecutar en un momento posterior de tiempo que esta función de efecto cuando se ejecuta por primera vez porque la de limpieza solo se ejecutará una vez que este valor cambie en algún momento del futuro.
    // Por lo tanto el valor almacenado en esta ref podría haber cambiado a medias.
    if (open) {
      modal.showModal();
    }
    // para cerrar el diálogo usamos una función cleanup que se ejecutará cada vez que esta función de efecto esté apunto de ejecutarse de nuevo. Así que cada vez que el valor de la prop open cambia.
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
