export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places'); // ojo esto puede lanzar un error porque no haya conexión.
  const resData = await response.json();
  //Manejar Error response (400, 500):
  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places'); // ojo esto puede lanzar un error porque no haya conexión.
  const resData = await response.json();
  //Manejar Error response (400, 500):
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}), //el backend está esperando recibir un objeto con una propiedad llamada places en la que estará el array de places. Esto se puede acortar como {places}
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data.')
  }
  return resData.message
}