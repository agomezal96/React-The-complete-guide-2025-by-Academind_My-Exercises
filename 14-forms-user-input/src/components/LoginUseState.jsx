import { useState } from 'react';
import Input from './Input';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import useInput from '../hooks/useInput';

export default function Login() {
  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false,
  // });
  // const [enteredValues, setEnteredValues] = useState({
  //   email: '',
  //   password: '',
  // });

  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput('', (value) => {
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6));

  // const emailIsInvalid =
  //   didEdit.email &&
  //   !isEmail(enteredValues.email) &&
  //   !isNotEmpty(enteredValues.email);
  // const passwordIsInvalid =
  //   didEdit.password && enteredValues.password.trim().length < 6;

  // const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log(emailValue, passwordValue);
  }

  // function handleInputChange(identifier, value) {
  //   setEnteredValues((prevValues) => {
  //     return {
  //       ...prevValues,
  //       [identifier]: value,
  //     };
  //   });
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: false,
  //   }));
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <div className="control no-margin">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            value={emailValue}
            error={emailHasError && 'Please enter a valid email'}
            // onBlur={() => handleInputBlur('email')}
            // onChange={(event) => handleInputChange('email', event.target.value)}
            // value={enteredValues.email}
            // error={emailIsInvalid && 'Please enter a valid email!'}
          />
          {/* <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div> */}
        </div>

        <div className="control no-margin">
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            value={passwordValue}
            error={passwordHasError && 'Please, enter a valid password'}
            // onBlur={() => handleInputBlur('password')}
            // onChange={(event) =>
            //   handleInputChange('password', event.target.value)
            // }
            // value={enteredValues.password}
            // error={passwordIsInvalid && 'Please enter a valid password!'}
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
