import { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Results from './components/Results';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  //? Validaremos si la información introducida en los inputs es válida si la duración del input es mayor que 0

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue, //!Añadiendo un + delante forzamos que el valor string que se saca del input, que siempre es una string, se vuelva un número. Esto es para que la función calculate pueda calcular con valores numéricos, y no nos concatene la string recogida en el input.
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than 0.</p>
      )}
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

export default App;
