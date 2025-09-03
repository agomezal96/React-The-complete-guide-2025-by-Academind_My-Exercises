import { useState, useRef } from 'react';
import ResultModal from './ResultModal';


export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  //   const [timerExpired, setTimerExpired] = useState(false);
  //   const [timerStarted, setTimerStarted] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  //! Queremos que el tiempo se pare no sólo si el botón stop se clica, sino si se llega al final de la cuenta atrás:
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000); //Esto podría causar un loop infinito (porque setear un estado hace que un componente se ejecute de nuevo al haber un cambio), pero como está dentro de una condición que no se cumple hasta que no se actualiza el estado con setTimeRemaining, estamos seguros. Pero hay que tener en cuenta que hacer el setTimeRemaining dentro de una función componente directamente puede causarnos un loop infinito de ejecuciones.
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000)
  }

  function handleStart() {
    timer.current = setInterval(() => {
      // Así este estado se actualiza cada 10 ms con el tiempo remaining actualizado.
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

  }

  function handleStop() {
    dialog.current.open();
    //Para tener acceso al timer de handleStart, necesitaremos una ref.
    clearInterval(timer.current); //Esto limpiará el interval pero necesita el id del timeout que quiere limpiar.
  }

  return (
    <>
      <ResultModal 
      ref={dialog} 
      result="lost" 
      targetTime={targetTime} 
      remainingTime={timeRemaining} 
      onReset={handleReset}/>

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
