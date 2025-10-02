import { useActionState } from 'react';
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from '../util/validation';

// Al pasarle signupAction al useActionState, la función signupAction se llamará de forma distinta, no se ejecutará cuando submitees el formulario. Resulta que formData com parámetro de signupAction será el segundo parámetro porque el primero será el prevFormState, el estado previo del formulario.
function signupAction(prevFormState, formData) {
  const data = Object.fromEntries(formData.entries());
  const acquisitionChannel = formData.getAll('acquisition');
  data.acquisitionChannel = acquisitionChannel;
  let errors = [];

  if (!isEmail(data.email)) {
    errors.push('Invalid email address.');
  }

  if (!isNotEmpty(data.password) || !hasMinLength(data.password, 6)) {
    errors.push('You must provide a password with at least six characters.');
  }

  if (!isEqualToOtherValue(data.password, data['confirm-password'])) {
    errors.push('Passwords do not match.');
  }

  if (!isNotEmpty(data['first-name']) || !isNotEmpty(data['last-name'])) {
    errors.push('Please provide both your first and last name.');
  }

  if (!isNotEmpty(data.role)) {
    errors.push('Please select a role.');
  }

  if (!data.terms) {
    errors.push('You must agree to the terms and conditions.');
  }

  if (data.acquisitionChannel.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  if (errors.length > 0) {
    //Para evitar que todos los campos se borren cuando se submitee el formulario, debemos ajustar signupAction y asegurarnos de que el estado que devolvemos no consiste en el objeto { errors }, sino que también contenga una información sobre los valores introducidos.
    return { errors, enteredValues: { ...data } };
  }
  console.log(errors);

  return { errors: null };
}

export default function Signup() {
  //Este hook disponible a partir de react 19 nos ayuda a recuperar el valor retornado por la función que le pasamos al atributo action del form. En este caso podremos recuperar el objeto que contiene la propiedad errors. Se le pasa la función de acción como primer valor de entrada, y en el segundo un valor inicial del formulario (antes de que se submitee). En este caso no queremos que se muestre error y por eso el valor inicial es un objeto con una propiedad errors vacía. Esto retorna un array como useState. El primer valor que devuelve es el estado del formulario, el segundo una función que wrapea la función que le hemos pasado (lo hace para escuchar la invocación de esa función action que le hemos pasado), y un tercer valor pending que es true o false dependiendo de si el formulario está siendo submiteado o no (nos servirá para la asincronía).

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    // Esto solo funciona en versiones por encima de la 19 de React. Al pasarle una función al atributo action del form, React lo que hace es ejecutar esa función. La función que se le pasa en lugar de recibir un objeto event, recibirá un objeto de tipo FormData.Por eso es muy importante añadir en cada input los atributos name.
    //Cuando React ejecuta la función del atributo action, el primer parámetro es el estado previo, pero el segundo (formData) puede ser undefined si el formulario no se ha enviado correctamente o si la función se llama en otro contexto. Así que al action hay que pasarle la función que te devuelve el useActionState, sino el segundo valor te saldrá undefined y te saldrán errores.
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.['confirm-password']}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.['first-name']}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.['last-name']}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            // Si el array aquisitionChannel incluye 'google', el checkbox debería estar checkeado.
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'google'
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'friend'
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'other'
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            // Si es true el value saldrá el input checkeado por defecto cuando se envíe el formulario.
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>
      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
