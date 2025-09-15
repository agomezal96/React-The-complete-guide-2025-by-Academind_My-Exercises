import { useState, memo, useCallback, useMemo, useEffect } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

//memo lo que hace es mirar el antiguo valor de la prop y el nuevo (initialCount), si ve que NO hay diferencias, la ejecución de la función componente será prevenida por memo. De esta manera nos ahorramos el hacer que las funciones se reejecuten de nuevo aunque lo haga el componente padre que las contiene. Esto aumenta la eficiencia.

//!No se debe usar memo en todos los componentes. Se recomienda usarlo tan arriba del árbol de componentes como sea posible. Porque si el componente padre se previene de ser ejecutado, los hijos también. Y si wrapeas todos los componentes con memo, React tendrá que estar comprobando siempre los cambios en las props de cada componente y esto tiene un coste.

const Counter = memo(function Counter({ initialCount }) {
  //memo es inútil ahora porque hemos puesto el ConfigureCounter, pero lo dejaremos para ver como se usa.

  log('<Counter /> rendered', 1);

  //?para prevenir la reejecución de funciones cuyo valor en el parámetro que le pasas no cambia, se usa el useMemo. De esta manera hacemos el proceso más eficiente, porque no ejecutamos inútilmente la función isPrime. React lo que hará será ejecutar la función dentro del useMemo y almacenará el valor en memoria que retorna esta función, y solo la volverá a reejecutar si el array de dependencias cambia.

  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);


  //!Usar un useEffect aquí no es óptimo porque esto se ejecuta una vez el componente se ha ejecutado, y esto dispara otra ejecución del componente al estar cambiando el estado con el setCounterChanges. O sea que tienes dos ejecuciones del componente en lugar de una. Una mejor manera de forzar a un componente a resetearse (es lo que queremos hacer cuando cambia initialCount) es usar una key en el componente (en App).
  // useEffect(() => {
  //   setCounterChanges([{value: initialCount, id: Math.random() * 1000}])
  // }, [initialCount])

  // const [counter, setCounter] = useState(initialCount);

  const [counterChanges, setCounterChanges] = useState([{value: initialCount, id: Math.random() * 1000}]);

  const currentCounter = counterChanges.reduce((prevCounter, counterChange) => prevCounter + counterChange.value, 0);

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [{value: -1, id: Math.random() * 1000}, ...prevCounterChanges])
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [{value: 1, id: Math.random() * 1000}, ...prevCounterChanges])
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges}/>
    </section>
  );
});

export default Counter;
