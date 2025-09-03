
export default function GameBoard({ onSelectSquare, board }) {
  //? Con el siguiente código tenemos un historial de qué botón se ha clicado. Necesitaríamos crear un estado en el componente App que tenga acceso a los componentes GameBoard y Log. Sin embargo, es una mala práctica crear estados para controlar la misma información con un poco más de datos es algo que se debería evitar como developer de React. En lugar de añadir un estado en App extra para controlar gameTurns, tiene más sentido dejar ese estado que maneja la información del estado actual al componente padre, pues así puede pasarle la info a los componentes hijos (gameBoard y Log) sin que sea redundante.

  //* Así a continuación lo que haremos será que el componente GameBoard no sea el que controle los turnos y el orden en el que los botones han sido clicados, que es información importante para el componente Log. Entonces, comentamos las siguientes líneas y trabajaremos con el componente App.

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare(); // Esta función se define desde fuera del componente, desde App y se llama desde dentro.
  // }

  //let gameBoard = initialGameBoard; // El tablón inicial es el vacío lleno de nulls.
  //? Pero querremos sobreescribir esta variable con el gameBoard actualizado con los datos recibidos de los turnos por parte de App, si es que tenemos los turnos. Si turns es un array vacío, querremos dejar el initialGameBoard tal y como está. Para conseguirlo podemos hacer un bucle for. Esto nos lo llevamos a App posteriormente para poder compararlo con las combinaciones de victoria, así que lo dejo comentado aquí.

  // for (const turn of turns) {
  //   const { square, playerSymbol } = turn;
  //   const { row, col } = square;
  //   // Sobreescribimos el valor de esa celda por el símbolo del jugador.
  //   gameBoard[row][col] = playerSymbol; // Esta línea falla.
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* No vamos a manejar nuestro game state en este componente, sino que lo pasaremos desde App */}
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null
                  //Esto para asegurarnos de que no se puede clicar un mismo botón más de una vez, añadimos condición dinámica a disabled.
                }>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
