import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './Button';
import { CartContext } from '../contexts/CartContext';
import UserProgressContext from '../contexts/UserProgressContext';

export default function Header() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
