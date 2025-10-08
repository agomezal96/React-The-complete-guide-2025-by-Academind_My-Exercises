import { useContext, useActionState, useOptimistic } from 'react';
import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { downvoteOpinion, upvoteOpinion } = useContext(OpinionsContext);
  //ojo que estas funciones son async, por lo tanto las actions tmb:

  //? useOptimistic es un hook que te ayuda a actualizar la UI de forma optimista. En este caso el número de votos. Dentro del () necesita el valor que debe actualizarse de forma optimista y una función que ejecutará React cuando tu lo definas. Esta función recibe un parámetro pasado por React automáticamente y el valor que recibirá será el antiguo estado gestionado por useOptimistic (el estado que estaba activo antes de que esta función fuera invocada o que todavía está activo en el momento que se invoca).

  //La función que llamas al usar el set, es aquella que has definido como segundo parámetro en el useOptimistic. Como el primer parámetro siempre será pasado por react, es en el segundo parámetro, el que recibirá el argumento

  // retorna un array como el useState. La función debe llamarse dentro de una acción de formulario porque el uso optimista está pensado para usarse junto con acciones de formulario. El estado es un estado temporal, que solo se muestra en la interfaz de usuario mientras que el formulario que invocó esta función optimista está siendo enviado. Y a partir de entonces este estado será desechado.

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) =>
    mode === 'up' ? prevVotes + 1 : prevVotes - 1
  );

  async function upvoteAction() {
    //!Se llama aquí setVotesOptimistically, antes de enviar la solicitud y esperar su respuesta, que es DENTRO de un FORM ACTION.
    setVotesOptimistically('up')
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically('down')
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        {/* Form actions tambien se pueden poner en el button dentro de un form a parte de en el form. Esto permite lanzar diferentes acciones de formulario para diferentes botones. */}
        <button
          formAction={upvoteFormAction}
          disabled={downvotePending || upvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={downvotePending || upvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
