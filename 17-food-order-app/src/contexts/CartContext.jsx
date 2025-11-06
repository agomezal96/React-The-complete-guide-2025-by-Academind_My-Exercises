import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      // Esto devuelve el índice si la condición es true. Usaremos el índice para actualizar el elemento. Eso significa que ya hay un item de ese tipo en la matriz (por ejemplo ya hay una pizza margarita)
      //si no encuentra el índice de la posición que se cumple en esa condición, devolverá -1.
      // Quiero devolver true si el ID del elemento que estoy viendo aquí es igual al ID del elemento que estoy recibiendo en mi acción.
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]; //Esto es un nuevo array en el que colocamos todos los items existentes, es crear una copia del array de items.

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    //queremos updatear este artículo del carrito existente de una manera inmutable
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      //Entonces queremos quitar todo el artículo de la cesta de la compra.
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  // el cart sería el state y el dispatchCartAction sería la función de envío
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = { items: cart.items, addItem, removeItem, clearCart };

  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
