import MealItem from './mealItem';
import useHttp from '../hooks/useHTTP';

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  //   useEffect(() => {
  //     async function getMeals() {
  //       const response = await fetch('http://localhost:3000/meals');
  //       if (!response.ok) {
  //         //...
  //         return;
  //       }
  //       const meals = await response.json();
  //       setLoadedMeals(meals);
  //     }
  //     getMeals()
  //   }, []
  // );
  // ! No pasar objetos literales inline como `{} ` al hook: causan nueva referencia en cada render
  // y re-ejecutan el useEffect del hook continuamente. Pasamos `null` para usar la lógica por defecto.
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);
  //?Se me crashea cuando la url es incorrecta, hay un problema con el componente error que no sé resolver.

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    // A veces `error` puede ser un objeto Error en lugar de string.
    // !Normalizamos a string antes de renderizar para evitar "Objects are not valid as a React child"
    const message =
      typeof error === 'string' ? error : error && error.message ? error.message : String(error);
    return <Error title="Failed to fetch meals" message={message} />;
  }
  // if (!data) {
  //   return <p> No meals found</p>
  // }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}
