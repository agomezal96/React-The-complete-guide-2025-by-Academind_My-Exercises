import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

//Queremos que esto solo se haga una vez al principio pero no hace falta que se haga un useEffect porque no es código asíncrono.
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    //Primero recibimos la localización del usuario.
    //Cuando se llama al getCurrentPosition, al usuario se le pregunta si quiere dar permiso para activar la geolocalización, y si se le concede, esto hará un fetch a la localización. Esto es un proceso que toma tiempo, por lo que dentro del paréntesis se coloca un callback que se ejecutará por el browser cuando se haya hecho el fetch de la localización.
    navigator.geolocation.getCurrentPosition((position) => {
      //El código que depende de esta localización se debe ejecutar dentro de esta función porque ésta función será ejecutada por el browser cuando la localización sea determinada. Aquí es donde quiero hacer el sort de los lugares:
      const SortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      //* Todo este código es un SideEffect porque es necesario por la App, pero no está directamente relacionado con la task, la main goal del componente App (que es retornar jsx renderizable).
      setAvailablePlaces(SortedPlaces); //!Fuera de un useEffect, esto ejecutaría un loop infinito porque se reejecutaría el componente al llegar a este cambio de estado y nunca saldríamos de aquí, la solución es usar useEffect().
      //La función useEffect será ejecutada por React DESPUÉS de la ejecución del componente
    });
  }, []); //Si una de las dependencias cambia, el useEffect se vuelve a ejecutar. Si no hay dependencias, no cambian, entonces solo se ejecuta el useEffect una vez (la vez cuando el componente App se ejecutó la primera vez.).

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    //*Esto sería otro sideEffect, pero en este caso no nos hace falta un useEffect porque estamos dentro de una función y no se pueden usar los hooks en nested functions, statments. Solo se pueden usar en el root level de la función Componente. Además no lo necesitamos porque este código solo se ejecuta cuando se ejecuta la función, es decir cuando el user hace clic en uno de los items y no entramos en un loop infinito.
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      //Si no existe este id no forma parte de storedIds todavía, quiero que me actualices la data, sinó no quiero que hagas nada.
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }
  }
//? useCallback acepta un primer parámetro que es la función que wrappea, y el segundo un array de dependencias. Retorna la función wrappeada pero ahora no es recreada cada vez que el componente que la contiene se reejecuta. De esta manera lo que hace react en este caso es usar de nuevo la misma referencia en memoria, no crear una función objeto nueva.
//! usar useCallback cuando se le pasen dependencias que son funciones al useEffect.
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    ); //Si no coincide el id con el id del que estoy clicando (current), entonces es que no es ese el que quiero eliminar, por lo tanto quiero conservarlo y hago que la función devuelva true dentro del filter. De esta manera lo conservo en mi array. Entonces solo se eliminará aquel cuyo id sea el mismo que el que se clica.
  }, [])


  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
