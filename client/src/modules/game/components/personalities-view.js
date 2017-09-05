import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
`;
const Col1 = styled.div`
  width: 33%;
`;
const Col2 = styled.div`
  width: 33%;
`;
const Col3 = styled.div`
  width: 34%;
`;
const Title = styled.div`
  font-size: 20px;
  color: #aaa;
  height: 25%;
  text-align: center;
`;
const Item = styled.div`
  font-size: 16px;
  height: 25%;
  text-align: center;
`;

const PersonalitiesView = ({ emotions, beliefs, personalities }) => (
  <Wrapper>
    <Col1>
      <Title>Emotions</Title>
      {emotions.map((value, idx) => (
        <Item key={idx}>{value}</Item>
      ))}
    </Col1>
    <Col2>
      <Title>Beliefs</Title>
      {beliefs.map((value, idx) => (
        <Item key={idx}>{value}</Item>
      ))}
    </Col2>
    <Col3>
      <Title>Personalities</Title>
      {personalities.map((value, idx) => (
        <Item key={idx}>{value}</Item>
      ))}
    </Col3>
  </Wrapper>
);

export default PersonalitiesView;

