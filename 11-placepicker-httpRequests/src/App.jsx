import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import ErrorPage from './components/ErrorPage.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    try {
      setIsFetching(true);
      async function fetchPlaces() {
        const userPlacesBackend = await fetchUserPlaces();
        setUserPlaces(userPlacesBackend);
      }
      fetchPlaces()
    } catch (error) {
      setError({ message: error.message || 'FAailed to fetch user places.' });
    }
    setIsFetching(false);
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([selectedPlace, ...userPlaces])

    //programación optimista porque estás updateando la UI antes de hacer la petición sin saber si va a ir bien o mal. Esto mejora la UX, mejor que estar mostrando un spinner. Esto para una petición put se prefiere por ejemplo los likes de Insta.
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    //No updateamos en el backend usando el estado porque la actualización del estado no está disponible inmediatamente, el estado no se actualizará hasta que no se reejecute la función. Así que usamos el estado anterior y le añadimos el nuevo selectedPlace.
    //!siempre que hay un await, tiene que haber un try-catch para recoger errores y que no crashee el programa
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]); //Esto se podría mover justo debajo de la línea de la function para que fuera programación pesimista: primero se pide, se espera a ver si la request ha ido bien, y veremos un spinner. No mola en este caso.
    } catch (error) {
      setUserPlaces(userPlaces); //si ha ido mal la petición lo que haré será volver al estado anterior updateando la UI
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        errorUpdatingPlaces({
          message: error.message || 'Failed to delete place',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occurred"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
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
        {error && (
          <ErrorPage title="An error occurred!" message={error.message} />
        )}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
