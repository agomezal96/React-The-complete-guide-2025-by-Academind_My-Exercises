import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count) => (
        //Usar un id en la key en lugar de un indice, a parte de no encontrar los problemas posicionales del índice (ayuda con el state management), lo que hace es que react siempre tenga localizado el elemento con su id entre la snapshot antigua del virtual dom y la nueva, lo que hace que se renderice solo un elemento nuevo en la lista y no la lista entera. Esto aumenta la eficiencia.
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
