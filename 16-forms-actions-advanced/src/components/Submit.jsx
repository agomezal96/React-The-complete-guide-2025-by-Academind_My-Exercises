import { useFormStatus } from 'react-dom';

export default function Submit() {
//   const { pending, data, method, action } = useFormStatus();
  const { pending } = useFormStatus();
  //pending será true o false en función de si el formulario se está submiteando o no.
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>{pending? 'Submitting...' : 'Submit'}</button>
    </p>
  );
}
