// importamos a redux con la node default syntax para paquetes de terceros
const redux = require('redux');

// ? 1. Creación de la función reducer:

const counterReducer = (state = { counter: 0 }, action) => {
  // hay que ponerle un default value a state siempre porque sino a la primera vez que se ejecuta el archivo el state es undefined y no puede sumar undefined + 1...

  //vamos a especificar los tipos de acciones para que haga una cosa u otra.

  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
}; // Esta función recibe dos parámetros, un Old State y una Dispatched Action. Luego devuelve un output, un nuevo State object. Debe ser una función pura porque no se pueden producir side effects dentro de esta función. No se pueden enviar peticiones o escribir algo en el localStorage, o hacer un fetch. Solo recibe los inputs y devuelve un output State object.

// ? 2. Creación de la store

const store = redux.createStore(counterReducer);
//La store manejará datos. EStos datos están determinados por la función reducer, porque es la función reducer la que produce nuevas snapshots.
//Al ponerle la función reducer sabe quién manipula los datos.

// ? 3. Creación de la suscripción a esta store
// No recibe parámetros pero dentro de la función podemos llamar a un método de la store, getState, que nos dará el último state snapshot tras haber sido actualizado.
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

//Vamos a hacer que redux esté atento a la función subscriber y decirle que esta función debe ejecutarse cuando el estado cambie. Para hacerlo, debemos llamar a la store y llamar al método subscribe. Esto espere una función subscriber que redux ejecutará cada vez que la data de la store cambie.

store.subscribe(counterSubscriber);

// ? 4. Creación y dispatch del action
// una action es un objeto de JS con una propiedad type en la que tenemos una unique string.
store.dispatch({ type: 'increment' }); // {counter: 1}
store.dispatch({ type: 'decrement' }); // {counter: 0}
