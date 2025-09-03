import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
  questionIndex
}) {
  const shuffledAnswers = useRef();

  //Esto tiene que estar aquí porque si no hay más preguntas, no existirá una pregunta activa para la length de userAnswers.
  if (!shuffledAnswers.current) {
    //si es undefined, estamos en el estado inicial. Una vez está definido, no quiero que el componente cuando se ejecute de nuevo, se vuelva a desordenar.
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // para desordenar las respuestas aleatoriamente
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';
        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }
        if (
          (answerState === 'correct' || answerState === 'wrong') && isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              className={cssClasses}
              onClick={() => onSelect(answer)}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
