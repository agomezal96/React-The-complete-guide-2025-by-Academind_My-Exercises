import { useDispatch, useSelector } from 'react-redux';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile'
import Counter from './components/Counter';
import Header from './components/Header';
import { authActions } from './store';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated)

  return (
    <>
      <Header />
     { !isAuth ? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
