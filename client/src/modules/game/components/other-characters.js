import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  
`;
const Title = styled.div`
  font-size: 18px;
  color: #aaa;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;
const Item = styled.div`
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
`;

const OtherCharacters = ({ characters }) => (
  <Wrapper>
    <Title>Others</Title>
    {
      characters.map((character, idx) => (
        <Item key={idx}>{character}</Item>
      ))
    }
  </Wrapper>
);

export default OtherCharacters;
