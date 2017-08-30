import React from 'react';
import styled from 'styled-components';
import buttonStyle from '../../../styles/button-style';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ExitButton = styled.div`
  ${() => buttonStyle}
`;

const NavBar = ({ exit }) => (
  <Wrapper>
    <ExitButton onClick={exit}>Exit</ExitButton>
  </Wrapper>
);

export default NavBar;
