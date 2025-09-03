import { useState, useCallback } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  //La aparición de las preguntas va en orden. Si el usuario ha respondido 2, entonces va por la tercera. Eso lo sabemos por el número de elementos que hay en el array, y coincide con el índice de la pregunta por la que va. Si el array userAnswers está vacío, vamos por la primera pregunta. Al trabajar con React intentas trabajar lo mínimo posible con estados y tratas de derivar estos estados. Es lo que estamos haciendo aquí.
  const activeQuestionIndex = userAnswers.length;
  //Solo si no todavía no hay respuesta seleccionada, el índice es el número de elementos que hay en userAnswers. Si se ha seleccionado una respuesta, entonces sigue siendo el mismo -1. Esto se hace así porque así no refrescamos el valor del índice en el momento en el que seleccionamos. Esto significa que tenemos que resetear el estado answerState a '' en algún momento.

  //El quiz acaba cuando registramos tantas respuestas como preguntas hay.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
  ); //! Es importante poner la dependencia activeQuestionIndex para que se recree la función. Y no queremos usar un valor de este índice desactualizado.

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers}/> ;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // La prop key además de para ayudar a React a identificar los elementos de una lista, también tiene otro propósito. Cada vez que ésta cambie,  incluso cuando este componente no sea parte de una lista, cuando la key cambie, React destruirá este componente con la key y lo montará de nuevo.
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
