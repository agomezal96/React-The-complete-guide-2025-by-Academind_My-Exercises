import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      //El backdrop solo se añade cuando se llama a la función showModal()
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
