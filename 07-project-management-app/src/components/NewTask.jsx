import { useState } from 'react';

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') return;
    setEnteredTask('');
    onAdd(enteredTask);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        type="text"
        onChange={handleChange}
        value={enteredTask} //si el valor inicial del useState es null, aparecerá una advertencia en consola, y esto es porque el estado pasa de no haber value (undefined) a de pronto tener una string. Entonces es mejor ponerle una string vacía.
      />
      <button
        className="text-stone-700 hover-text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
