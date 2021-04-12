import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;
`;

const HeaderText = styled.h1`
  margin: 0;
  background: #ff7e5f;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
`;

function Header() {
  return (
    <Container>
      <HeaderText>@tweetstream</HeaderText>
    </Container>
  );
}

export default Header;
