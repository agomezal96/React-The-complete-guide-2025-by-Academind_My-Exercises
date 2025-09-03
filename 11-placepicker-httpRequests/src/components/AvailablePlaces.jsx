import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  //!Estos tres estados son típicos cuando se trabaja con fetch en react.
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  //? CON async await
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        // const response = await fetch('http://localhost:3000/places'); // ojo esto puede lanzar un error porque no haya conexión.
        // const resData = await response.json();
        // //Manejar Error response (400, 500):
        // if (!response.ok) {
        //   throw new Error('Failed to fetch places');
        // }

        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces); //esto solo se puede producir si no ha habido ningun error, esta línea fuera del try puede crashear la app si ha habido un error porque nunca le llega el resData
          setIsFetching(false); //Esto suele estar fuera del bloque try-catch porque quiero terminar este estado tenga error o no. Incluso aunque hayamos fallado haciendo fetch, ya no estamos fetcheando, no estamos cargando la info anymore. Pero quiero que JS lo ejecute CUANDO ya tenga mis sortedPlaces, es decir, tenga ejecutada la función una vez se tiene la ubicación.
        });
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.',
        });
        setIsFetching(false); // si tenemos un error, queremos que deje de cargar
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  //?Sin async await
  // useEffect(() => {
  //   fetch('http://localhost:3000/places')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
