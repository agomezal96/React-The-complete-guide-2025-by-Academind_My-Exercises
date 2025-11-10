import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';



// Creamos store, pero con configStore, pues hace que mergear múltiples reducers en una función única sea más fácil.
// A configStore se le pasa un objeto de configuración en el que seteamos una reducer property, no reducers. Esto es porque Redux quiere una main reducer function responsable del estado global. Sin embargo, con configureStore() el valor para el reducer puede ser una single reducer.

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

//Para hacer el dispatch de las actions, createSlice crea automáticamente unique actions identifiers para los diferentes reducers. Para hacerse con estos identifiers, podemos usar el counterSlice y acceder a la propiedad actions. Esto es un objeto lleno de keys, donde los key names match the method names. Podemos acceder a estos keys para que redux toolkit dispatch una acción cada vez que se llama a estos métodos.
//counterSlice.actions.toggleCounter() returns an action object of this shape: {type: 'some auto-generated unique identifier'}

export default store;
