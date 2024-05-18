import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Navbar = () => {
  const { cart } = useCart();

  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo>E-Commerce.</Logo>
        </Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
