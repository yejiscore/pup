import React from 'react';
import { styled } from 'styled-components';
import Header from '../components/Edit/Header';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 49px;
`;

function EditPet() {
  return (
    <Container>
      <Header />
      <div>d</div>
    </Container>
  );
}

export default EditPet;
