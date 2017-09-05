import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;
const NameText = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 30px 0;
`;
const IntroText = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 20px 0;
`;

const CharacterIntro = ({ name, intro }) => (
  <Wrapper>
    <NameText>{name}</NameText>
    <IntroText>{intro}</IntroText>
  </Wrapper>
);

export default CharacterIntro;
