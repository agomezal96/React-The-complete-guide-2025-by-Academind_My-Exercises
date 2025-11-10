import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

// Vamos a usar el createSlice, que es más potente que el createReducer de redux toolkit.
// Podemos crear múltiples slices, que serán piezas de estados, para hacer el código más mantenible.
// reducers es un objeto, un mapa de todos los reducers que esté slice necesita. Añadiremos métodos.
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      //!usando el createSlice, NO podemos manipular el estado original, por eso ahora parece que podamos hacerlo. Esto es porque redux toolkit usa internamente un paquete llamado immer, que detecta código como este y automáticamente clona el estado existente, crea un state object, mantiene todo el estado y sobreescribe aquel dato que estamos cambiando de forma inmutable.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    //aquí necesitamos un payload.
    increase(state, action) {
      //Ahora hay que poner el payload como propiedad de action porque es el nombre de la propiedad que conservará cualquier data extra que vayamos a dispatch.
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// Creamos reducer

// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'increment') {
//     //! NUNCA se debe mutar un estado, nunca mutar el estado original que tenemos o tendremos bugs o comportamientos impredecibles. Poner esto es muy incorrecto
//     //! state.counter++
//     //*En su lugar siempre se debe sobreescribir retornando un nuevo state object
//     return { counter: state.counter + 1, showCounter: state.showCounter };
//   }

//   if (action.type === 'increase') {
//     //customizar las actions permite mayor escalabilidad a la hora de pasarle mas payloads a las actions
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'decrement') {
//     return { counter: state.counter - 1, showCounter: state.showCounter };
//   }

//   if (action.type === 'toggle') {
//     return { counter: state.counter, showCounter: !state.showCounter };
//   }

//   return state;
// };

// Creamos store, pero con configStore, pues hace que mergear múltiples reducers en una función única sea más fácil.
// A configStore se le pasa un objeto de configuración en el que seteamos una reducer property, no reducers. Esto es porque Redux quiere una main reducer function responsable del estado global. Sin embargo, con configureStore() el valor para el reducer puede ser una single reducer.

const store = configureStore({reducer: counterSlice.reducer});

//Para hacer el dispatch de las actions, createSlice crea automáticamente unique actions identifiers para los diferentes reducers. Para hacerse con estos identifiers, podemos usar el counterSlice y acceder a la propiedad actions. Esto es un objeto lleno de keys, donde los key names match the method names. Podemos acceder a estos keys para que redux toolkit dispatch una acción cada vez que se llama a estos métodos. 
//counterSlice.actions.toggleCounter() returns an action object of this shape: {type: 'some auto-generated unique identifier'}

export const counterActions = counterSlice.actions

export default store;
