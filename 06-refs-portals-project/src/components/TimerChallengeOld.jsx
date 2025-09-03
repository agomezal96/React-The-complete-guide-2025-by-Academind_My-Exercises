import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

//Creamos la variable timer fuera para que las funciones handleStart y handleStop puedan accceder a ella. El problema que tiene esto es que cada vez que un estado cambia, la función se vuelve a crear y la variable timer también. Entonces el timer usado en handleStop será diferente al de handleStart. Por eso, tenemos que sacarla fuera de la función componente, para que no se recree de nuevo. El problema de esto es que es una variable que será compartida por todas las instancias del componente. Por eso la variable timer no es la solución.

// let timer;

//La solución a esto es usar refs. De esta manera el timer que se crea es específico de cada instancia del componente, y trabajan cada uno por separado. Al mismo tiempo y a diferencia de con las variables definidas en la función componente, esta ref no será reseteada o cleared cuando el componente se reejecuta. En su lugar, como con los estados, por debajo, React guardará el valor de las refs y se asegura de que no se pierdan mientras el componente se reejecuta. El uso de la ref además no afecta directamente la UI.

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    //targetTime está en segundos así que lo multiplicamos * 1000
    //setTimeOut establece un temporizador que ejecuta una función o una pieza de código específica una vez que expira el temporizador.

    //! En lugar de añadir un timeout, como tambien queremos saber cuánto tiempo falta, setearemos mejor un intervalo con setInterval(). Esta función lo que hace es ejecutar el callback cada vez que el tiempo expira, no solo una vez. En lugar del targetTime lo que haremos será añadir una duración para saber cuánto tiempo ha expirado. Ver el archivo TimerChallenge.

    timer.current = setTimeOut(() => {
      setTimerExpired(true); //Este código se ejecuta una vez expira el temporizador.
      dialog.current.open() //este método es el que he definido en el useImperativeHandle. De modo que es ahora este objeto lo que está almacenado en dialog.current del TimerChallenge. Esto lo que hace es desvincular el TimerChallenge del elemento dialog resultante de la función ResultModal. De modo que si cambiamos el dialog a div de ResultModel solo habrá que cambiar la lógica de interior de useImperativeHandle y no se romperá el código de TimerChallenge.
    }, targetTime * 1000);
    setTimerStarted(true); // esta línea se ejecutará inmediatamente después de iniciar el timeout, no después de que expire.
  }

  function handleStop() {
    //Para tener acceso al timer de handleStart, necesitaremos una ref.
    clearTimeout(timer.current); //Esto limpiará el timeout pero necesita el id del timeout que quiere limpiar.
  }

  return (
    <>
    {/* La modal será renderizada siempre porque, dado que está invisible, tenerla incondicionalmente no causará*/}
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
