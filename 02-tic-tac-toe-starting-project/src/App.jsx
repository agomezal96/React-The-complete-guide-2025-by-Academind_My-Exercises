import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = { X: 'Player 1', O: 'Player 2' };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//Creamos una función helper que no necesita acceso al estado y que no hace falta que se vuelva a crear cuando se vuelva a ejecutar la función del componente.

function derivedActivePlayer(gameTurns) {
  //? En lugar de un estado activePlayer podemos añadir un estado derivado de gameTurns con la misma lógica que en la función setGameTurns:

  let currentPlayer = 'X';
  // La diferencia es que en lugar del valor anterior del estado aquí usas el estado actual que hay en gameTurns. Así estamos llegando al símbolo del jugador actualmente activo de gameTurns.
  if (gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  //!Para encontrar un ganador:

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns) {
  //!HAY QUE CREAR UN ARRAY NUEVO, NO USAR EL ORIGINAL
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, playerSymbol } = turn;
    const { row, col } = square;
    //!Ojo HAY QUE CREAR UN ARRAY NUEVO O SOBREESCRIBES EL ORIGINAL, let gameBoard = [...initialGameBoard]
    gameBoard[row][col] = playerSymbol;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]); // Esta será la info que le pasaremos a Log y GameBoard sobre el orden de clicado de cada botón y el turno
  // const [activePlayer, setActivePlayer] = useState('X'); //? En realidad con el estado de gameTurns no te hace falta el activePlayer, ya lo tienes en el gameTurns.

  //Llamamos a la función derivedActivePlayer y le pasamos el gameTurns, que sí está disponible dentro del componente.
  const activePlayer = derivedActivePlayer(gameTurns);

  //*Nos conviene comprobar cada vez que el componente App se renderiza si hay un ganador. Así que vamos a recorrer el array de combinaciones de victoria y lo compararemos con lo que tenemos en nuestro gameTurns.

  const gameBoard = derivedGameBoard(gameTurns);
  //!Para encontrar un ganador:
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));

    setGameTurns((prevTurns) => {
      //! Aquí podrías pasar de nuevo la función derivedActivePlayer(prevTurns) y te ahorras el código más adelante, pero lo vamos a dejar para que se vean las explicaciones. De este modo te ahorrarías la duplicación de código.

      // trabajamos programando el valor del estado que tendrá cuando se ejecute, por eso se usa el valor previo. Ahora resulta que vamos a devolver un array de turnos updateado, pero no podemos usar como player: activePlayer, por el mismo problema. Al ser un estado cuya actualización se programa, react podría crashear si su valor no se actualiza a tiempo. Así que vamos a crear un currentPlayer:
      let currentPlayer = 'X';
      // Si el array de turnos no está vacío y el último jugador era X, entonces lo seteamos a O. Estamos comparando con el valor anterior del estado usando el prevTurns.
      if (prevTurns.length > 0 && prevTurns[0].playerSymbol === 'X') {
        currentPlayer = 'O';
      }

      // Devolvemos el array de turnos, la info total de los turnos. Ojo porque como ves siempre se añade el último turno al principio del Array, por eso usamos prevTurns[0] en el if anterior.

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  //! Para reiniciar el juego:
  // gameTurns es el estado que usamos para derivar el activePlayer, y el que usamos para comprobar si hay un ganador, también es el que le pasamos a nuestros componentes Log y GameBoard. Es nuestra fuente de verdad. Así que reiniciar le juego significa que debemos restablecer gameTurns a una matriz vacía. Todo lo demás se ajustará automáticamente ya que estamos derivando todos los demás datos de este estado.

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...players,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={'X'}
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={'O'}
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare} // los parámetros de esta función se los pasas al usarla en el GameBoard, que son las coordenadas del botón al hacer click.
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
