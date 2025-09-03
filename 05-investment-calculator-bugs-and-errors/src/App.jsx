import { useState } from 'react';

import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
//! Si usas el browser en la pestaña sources puedes ver el código que está leyendo y ejecutando el browser. Ahí puedes seleccionar una línea para añadir un debugger. Vemos que newValue cuando hacemos un cambio en el input es una string. Esto está causando errores matemáticos porque no se están haciendo bien las operaciones por la función investment.js
//* Añadimos un + delante de newValue para convertir la string a number
  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      <Results input={userInput} />
    </>
  );
}

export default App;
