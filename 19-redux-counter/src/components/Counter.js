import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counterSlice'

const Counter = () => {
  //para acceder a la store tenemos el hook useSelector de react-redux. A este hook le tenemos que pasar una función que determina qué pieza de data queremos sacar de la store. Esta función recibirá el state manejado por redux y retornamos la parte del state que queremos extraer.
  //Cuando usas el useSelector, react-redux crea automáticamente una suscripción del componente a la store. Así, el componente será actualizado (ejecutado) cada vez que cambie el dato en la store.

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector ((state) => state.counter.showCounter)

  const incrementHandler = () => {
    // dispatch({ type: 'increment' });
    //Aquí no se pasa el pointer, se ejecuta, porque increment es un método que al ejecutarse crea el action object con el {type: SOME_UNIQUE_IDENTIFIER} 
    dispatch(counterActions.increment())
  };
  const decrementHandler = () => {
    // dispatch({ type: 'decrement' });
    dispatch(counterActions.decrement())
  };

  const increaseHandler = () => {
    // dispatch({ type: 'increase', amount: 5 });
    //El payload lo pasas como parámetro al método. El objeto que se generará será algo así: {type: SOME_UNIQUE_IDENTIFIER, payload: 5}
    dispatch(counterActions.increase(5))
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: 'toggle' });
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
