import React from 'react';
import styled from 'styled-components';
import LoginRegisterBox from './login-register-box';

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WelcomeTitle = styled.h1`
  display: inline-block;
`;

const Welcome = () => (
  <Wrapper>
    <WelcomeTitle>
      Welcome to Pandora Game
    </WelcomeTitle>
    <LoginRegisterBox />
  </Wrapper>
);

export default Welcome;
