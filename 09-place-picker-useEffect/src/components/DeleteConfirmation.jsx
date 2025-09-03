import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    //!Al retornar esta función el useEffect lo que hace es ejecutarla justo después de que se vaya a ejecutar el useEffect de nuevo ó JUSTO ANTES DE QUE EL COMPONENTE SE DESMONTE del DOM. Aquí iría la función que limpia el timeout.
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
    //Cuando se añaden funciones como dependencias existe el peligro de crear un loop infinito. Si la dependencia es un estado, por ejemplo, no pasa nada porque se reejecutará el useEffect cuando cambie el estado. Pero cuando la dependencia es una función, (las funciones son valores en JS, específicamente son objetos), se recrea cada vez que se ejecuta App (pues es quien se la pasa a DeleteConfirmation). El tema está en que las funciones como son objetos, se crea una nueva referencia, pues nunca se tratarán como lo mismo aunque el código que contengan en su interior sea el mismo.
    //! Es decir, que la función onConfirm será diferente entre ciclos de renderización. Mientras el componente App se re renderiza, una nueva función handleRemovePlace se creará y se pasará a DeleteConfirmation en su onConfirm. Entonces esta función se leerá en DeleteConfirmation y React comparará EL VALOR de la función onConfirm del anterior componente con el nuevo y verá que no son el mismo. Así que volverá a ejecutar el useEffect.
    //?Y este valor de onConfirm cambia cada vez que App se rerenderiza, cada vez que hay un cambio en un estado. En este caso como la Modal desaparece del DOM no corremos el peligro de entrar en un loop infinito. Pero el peligro está ahí. Por ello se puede usar un hook nuevo: useCallback.
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
