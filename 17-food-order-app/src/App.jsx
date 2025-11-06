import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContextProvider from './contexts/CartContext';
import { UserProgressContextProvider } from './contexts/UserProgressContext';

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main>
            <Meals />
            <Cart />
            <Checkout />
          </main>
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
