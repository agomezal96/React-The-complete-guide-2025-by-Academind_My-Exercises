import { useState } from 'react';

import { styled } from 'styled-components';

import Button from './Button';
import Input from './Input';

//Puedes crear este componente en un archivo a parte, pero aquí lo usaremos tal cual a continuación:
const ControlContainer = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
`;

//Para derivar un parámetro dinámico, styled-components nos da el objeto props como un input de esta función que ejecutará para nosotros. Esto incluye todas las props que se han seteado en el componente. En Label tenemos la prop invalid. Pues podemos desestructurarla en el callback para usarla en una función.

// const TextButton = styled.button`
//   cursor: pointer;
//   background: none;
//   line-height: inherit;

//   color: #f0b322;
//   border: none;

//   &:hover {
//     color: #f0920e;
//   }
// `;

// En el caso del hover, como hacemos referencia al button mismo, el & no va separado por un espacio. Cuando usamos un espacio separado nos referimos a los hijos del componente mismo.

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs" className='w-full max-w-sm mx-auto p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800'>
      {/* <ControlContainer> */}
      <div className='flex flex-col gap-2 mb-6'>
        <p>
          {/* <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            // className={emailNotValid ? 'invalid' : undefined}
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          /> */}

          <Input
            type="email"
            // $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
            label={'Email'}
            invalid={emailNotValid}
          />
        </p>
        <p>
          {/* <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            $invalid={passwordNotValid}
            // className={passwordNotValid ? 'invalid' : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          /> */}

          <Input
            type="password"
            // $invalid={passwordNotValid}
            label={'Password'}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
            invalid={passwordNotValid}
          />
        </p>
      </div>
      {/* </ControlContainer> */}
      <div className="flex justify-end gap-4">
        {/* <TextButton type="button">Create a new account</TextButton> */}
        <button type="button" className='text-amber-400 hover:text-amber-600'>Create a new account</button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
