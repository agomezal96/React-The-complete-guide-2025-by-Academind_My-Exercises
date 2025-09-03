import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  //! Tengo problemas de renderizado del portal y por eso no lo he puesto.
  return (
    <dialog
      ref={dialog}
      className="p-4 rounded-md shadow-md backdrop:bg-stone-900/90 "
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>
  );
});

export default Modal;
