import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
}); // el valor de createContext será un objeto que contiene un componente de react con unas propiedades en concreto (como provider y consumer).El valor que será pasado como valor por el contexto puede ser cualquier valor que quieras. Por ejemplo un objeto con una propiedad 'items' que sea un array. Este valor será accesible por todos aquellos componentes que estén dentro del contexto.

//Una vez tienes el contexto, tienes que proveer este contexto a la aplicación y wrappearlo en alguna parte de ésta para que aquellos componentes que estén dentro puedan acceder la contexto. Así que primero hay que exportarlo.

// export default CartContext;

//*Creación del contexto: Con createContext, creas un objeto de contexto que tiene dos componentes principales:

//Provider: Este es el componente que "provee" los datos. Lo envuelves alrededor de los componentes que necesitan acceso a la información. El Provider tiene una prop llamada value a la que le pasas los datos que quieres compartir (por ejemplo, un estado, un objeto o una función).

//Consumer: Este es el componente que "consume" o accede a los datos. Aunque se puede usar, la forma moderna y más común de acceder a los datos es a través del hook useContext. El componente Consumer se puede usar para wrappear jsx que debe tener acceso al valor del contexto. Este Consumer necesita un child especial que se pasa entre los tags de apertura y cierre. Este child es una función que será ejecutada por React y lo que hace es recibir el value del Contexto como un parámetro, y retorna el jsx que debería ser retornado por el Componente. Esto es común en versiones más antiguas de React, al no ser tan legible, este approach no se recomienda ahora mismo.
//<CartContext.Consumer>
//{(cartCtx) => {
//    return (todo el jsx del Componente)
//}}
//</CartContext.Consumer

//*Acceso a los datos: Cualquier componente que esté anidado dentro del Provider (sin importar qué tan profundo esté) puede acceder a los datos del contexto usando el hook useContext(MiContexto).

//*El valor por defecto es el argumento que le pasas a createContext(defaultValue). Este valor se utiliza en dos escenarios principales:

//Cuando un componente no tiene un Provider arriba: Si un componente Consumer o useContext intenta acceder al contexto, pero no hay un Provider que lo envuelva en el árbol de componentes, este recibirá el defaultValue que definiste al crear el contexto.

//Para autocompletado y tipado: En entornos como TypeScript o con editores de código que soportan autocompletado, el defaultValue ayuda a inferir la forma de los datos del contexto, lo que mejora la experiencia de desarrollo.

//En resumen, el defaultValue lo recibe cualquier componente que consuma el contexto cuando no está dentro del alcance de un Provider.

//*El valor real que los componentes reciben es el que se pasa a la propiedad value del Provider:
//<MiContexto.Provider value={valorReal}>
//Este es el valor que los componentes que consumen el contexto (usando useContext o MiContexto.Consumer) recibirán siempre y cuando estén dentro del Provider. Este valor puede ser un estado, un objeto, una función o cualquier dato que desees compartir.

function shoppingCartReducer(state, action) {
  //Esta función no se debe estar creando cada vez que se ejecuta el componente, por eso va fuera.
  // En el parámetro action se le pasará el objeto que se le pasa al dispatch como valor.

  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
      return { ...state, items: updatedItems };
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  //?El useReducer hook en React es una alternativa a useState que se utiliza para manejar estados complejos. Es especialmente útil cuando la lógica del siguiente estado depende del estado anterior o cuando tienes múltiples sub-valores de estado. Te ayuda a organizar la lógica de actualización del estado en un lugar centralizado, fuera del componente.

  //El hook useReducer te devuelve un par de valores en un array, de manera similar a useState:
  //El estado actual: Es la variable que contiene el valor del estado que necesitas usar en tu componente.
  //Una función dispatch: Esta función se usa para enviar (o "disparar") una acción que describa cómo quieres actualizar el estado.

  //La sintaxis básica es la siguiente:
  //const [state, dispatch] = useReducer(reducer, initialState);

  //Para usar useReducer, necesitas dos argumentos principales:

  //La función reducer: Es una función pura que toma el estado actual y una acción como argumentos. Su trabajo es devolver el nuevo estado. La función reducer no debe mutar el estado; en su lugar, debe devolver un nuevo objeto de estado. A menudo se usa un switch para manejar diferentes tipos de acciones.

  //El initialState: Es el valor inicial de tu estado. Es el mismo concepto que el valor inicial que le pasas a useState.

  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  // setShoppingCart((prevShoppingCart) => {
  //    const updatedItems = [...prevShoppingCart.items];

  //    const existingCartItemIndex = updatedItems.findIndex(
  //      (cartItem) => cartItem.id === id
  //    );
  //    const existingCartItem = updatedItems[existingCartItemIndex];

  //    if (existingCartItem) {
  //      const updatedItem = {
  //        ...existingCartItem,
  //        quantity: existingCartItem.quantity + 1,
  //      };
  //      updatedItems[existingCartItemIndex] = updatedItem;
  //    } else {
  //      const product = DUMMY_PRODUCTS.find((product) => product.id === id);
  //      updatedItems.push({
  //        id: id,
  //        name: product.title,
  //        price: product.price,
  //        quantity: 1,
  //      });
  //      }

  //       return {
  //         items: updatedItems,
  //       };
  //     });
  //   }

  function handleUpdateCartItemQuantity(productId, amount) {
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems = [...prevShoppingCart.items];
    //   const updatedItemIndex = updatedItems.findIndex(
    //     (item) => item.id === productId
    //   );

    //   const updatedItem = {
    //     ...updatedItems[updatedItemIndex],
    //   };

    //   updatedItem.quantity += amount;

    //   if (updatedItem.quantity <= 0) {
    //     updatedItems.splice(updatedItemIndex, 1);
    //   } else {
    //     updatedItems[updatedItemIndex] = updatedItem;
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    // En React 19 ya no hace falta poner .Provider, pero aquí lo dejaremos así. Al final lo que hacemos es acceder a la propiedad Provider del objeto que nos ha dado el contexto que nos permite usarlo como un componente de React.
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
