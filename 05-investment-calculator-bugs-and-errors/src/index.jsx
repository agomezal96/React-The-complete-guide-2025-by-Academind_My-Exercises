import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    //STrictMode por debajo hace unas cosas que nos pueden ayudar a encontrar problemas. Por ejemplo lo que hace es ejecutar los componentes dos veces en lugar de una. Esto solo se hace mientras estás desarrollando. El problema en el caso de App es que se estaba creando results como array vacío una vez porque está fuera de la función Results.
  <StrictMode>
    <App />
  </StrictMode>
);
