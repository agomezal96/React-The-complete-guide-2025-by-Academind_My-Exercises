// Para pasar una ref a un componente de clase o de función en versiones antiguas de react, necesitas usar React.forwardRef() y wrappear nuestra función.

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef(); //Creamos una nueva ref porque queremos desvincular el elemento dialog de cualquier otro componente externo (p.ej. TimerChallenge).

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // Para definir propiedades y métodos que deberían estar accesibles en este componente desde fuera se usa este hook. Este hook no se suele usar muy a menudo porque se suele preferir trabajar con props. Pero en este caso lo queremos para hacer este componente más estable y reusable.
  // Este hook espera dos argumentos: una ref (como la que estamos recibiendo) y una función que retorne un objeto que agrupe todos los métodos y props que le vamos a pasar a otros componentes.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    // La modal será renderizada siempre porque, dado que está invisible, tenerla incondicionalmente no causará. PERO. En el DOM se renderizará dentro del componente TimerChallenge, será hermano de las sections challenge. Si quisiéramos que en el HTML, este dialog de la modal saliera en otra parte del HTML de mayor nivel por cuestiones de accesibilidad (ojo, esta modal tiene que pertenecer a este componente.), se tiene que importar de 'react-dom' la función createPortal. Literalmente es un portal que teletransporta el código a otra parte del DOM. Para ello hay que wrappear lo que devuelve el return. Esto tendrá dos argumentos: el primero sería el jsx que devuelve el return. El segundo es el HTML elemento donde se debe teletransportar al final. Esto debe ser un elemento que exista en index.html. En nuestro caso tenemos una div con el id modal al que podemos enviarlo.

    // Nos conviene usar un elemento dialog porque viene con estilos y funcionalidades preconstruidos que la hacen presentarse como una overlay fácil y conveniente. Por defecto está invisible. Podemos hacer que sea visible con el atributo open, pero lo vamos a controlar con refs.
    //!En el onClose se le pasa la función para cerrar con la tecla ESC
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You {result}</h2>}
      {!userLost && <h2>Your score {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left</strong>.
      </p>
      {/* Añadimos un form al que le seteamos el method dialog que es algo que está construido en HTML nativo y soportado por browsers modernos. Si añadimos un form con el método dialog dentro de un dialog, un button que submitea el form cerrará el diálogo sin necesidad de JS extra. */}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>, document.getElementById('modal')
  );
});

export default ResultModal;
