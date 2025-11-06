import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { currencyFormatter } from "../util/formatting";

export default function CartItem({ item }) {
    const cartCtx = useContext(CartContext)

    function onIncrease() {
        cartCtx.addItem(item)
    }

    function onDecrease() {
        cartCtx.removeItem(item.id)
    }
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
