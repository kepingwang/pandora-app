import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #333;
  padding: 0 10px;
`;
const Button = styled.div`
  border: none;
  cursor: pointer;
  padding: 0 10px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  display: inline-block;
  font-size: 14px;
  color: #fff;
  user-select: 'none';
  &:hover {
    opacity: 0.65;
  }
`;

const NavBar = ({ buttons }) => (
  <Wrapper>
    {buttons.map(({ name, onClick }, idx) => (
      <Button key={idx} onClick={onClick}>{name}</Button>
    ))}
  </Wrapper>
);

export default NavBar;
