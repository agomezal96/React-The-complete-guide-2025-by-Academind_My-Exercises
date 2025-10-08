import { useActionState, useContext } from 'react';
import { OpinionsContext } from '../store/opinions-context';
import { useFormStatus } from 'react-dom';
import Submit from './Submit';

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get('userName');
    const body = formData.get('body');
    const title = formData.get('title');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Title must be at least 5 characters long.');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Your opinion must be between 10 and 300 characters long.');
    }

    if (!userName.trim()) {
      // Si el userName es falsey, si es una cadena vacía después de recortarlo, si no se proporcionó un nombre...
      errors.push('Please provide your name.');
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { userName, title, body } };
    }

    await addOpinion({ userName, title, body });

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(shareOpinionAction, {
    errors: null,
  });
  //pending será true hasta que la promesa de addOpinion se resuelva. React esperará a que se resuelva. Para lidiar con esto tenemos otro hook de reactDom:
  //? useFormStatus debe usarse en un componente anidado, no en el componente padre que contiene el formulario.

  useFormStatus

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
