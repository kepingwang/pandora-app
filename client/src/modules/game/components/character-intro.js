import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;
const NameText = styled.h1`
  text-align: center;
  margin: 0;
  padding: 30px 0;
`;
const IntroText = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 20px 0;
`;

const CharacterIntro = ({ name, description }) => (
  <Wrapper>
    <NameText>{name}</NameText>
    <IntroText>{description}</IntroText>
  </Wrapper>
);

export default CharacterIntro;
