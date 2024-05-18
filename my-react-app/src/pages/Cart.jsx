import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <Container>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <div>
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </CartItem>
          ))}
          <h3>Total: ${getTotalPrice()}</h3>
        </>
      )}
    </Container>
  );
};

export default Cart;
