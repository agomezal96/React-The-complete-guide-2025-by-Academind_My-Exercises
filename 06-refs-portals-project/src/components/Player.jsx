import { useState, useRef } from 'react';

export default function Player() {
  const playerNameInput = useRef();
  // una ref creada con useRef te da un objeto JS que dentro tiene una propiedad llamada current. Esta propiedad current es donde el valor actual del ref se almacena. Entonces ahora puedes acceder a todas las propiedades de ese current poniéndole un . : playerNameInput.current.value. Es mas fácil manejar el cambio de estado del input con una ref que con dos estados (uno de submitted(booleano) y el otro de enteredPlayerName).

  //Si quieres hacer un clear cuando se hace el click, se puede añadir en la función handleClick:     playerNameInput.current.value = ''; Pero esto violaría el principio declarativo de react al estar escribiendo código instructivo. No queremos manipular el DOM, queremos leerlo, React se encarga de manejar todas las interacciones del DOM. En este caso, con esta sentencia nos ahorramos escribir mucho código y al final estamos limpiando el input, que no está conectado a ningún estado, entonces podemos considerar escribir código instructivo.

  //!Pero hay que ir con cuidado y no empezar a usar los useRef para manipular el DOM, porque no es la idea que existe detrás de React. Si lo usas para hacerte la vida más fácil como hemos hecho con esa línea, entonces no hay problema.

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerNameInput.current.value);
    playerNameInput.current.value = '';
  }
  return (
    <section id="player">
      {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2> */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>

      <p>
        <input ref={playerNameInput} type="text" /> 
    {/*!!!!! OJO, la ref se lee cuando se renderiza el componente, no podemos usar su valor antes de llegar a ella. Es decir, no podemos en lugar de enteredPlayerName en la linea 20 poner playerNameInput.current.value, porque nos dará que es undefined. Pero es que además, aunque la ref cambie, la función componente  no se vuelve a ejecutar, eso en cambio sí pasa con el useState, entonces necesitamos que sea un useState el enteredPlayerName  */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
