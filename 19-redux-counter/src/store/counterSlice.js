import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
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

export const counterActions = counterSlice.actions;

export default counterSlice.reducer