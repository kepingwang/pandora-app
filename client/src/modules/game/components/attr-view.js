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
const ItemText = styled.div`
  font-size: 16px;
  height: 25%;
  text-align: center;
`;

const Item = ({ name, intensity }) => (
  <ItemText>
    {name} ({intensity})
  </ItemText>
);

const PersonalitiesView = ({ emotions, beliefs, personalities }) => (
  <Wrapper>
    <Col1>
      <Title>Emotions</Title>
      {emotions.map((item, idx) => (
        <Item
          key={idx}
          name={item.get('name')}
          intensity={item.get('intensity')}
        />
      ))}
    </Col1>
    <Col2>
      <Title>Beliefs</Title>
      {beliefs.map((item, idx) => (
        <Item
          key={idx}
          name={item.get('name')}
          intensity={item.get('intensity')}
        />
      ))}
    </Col2>
    <Col3>
      <Title>Personalities</Title>
      {personalities.map((item, idx) => (
        <Item
          key={idx}
          name={item.get('name')}
          intensity={item.get('intensity')}
        />
      ))}
    </Col3>
  </Wrapper>
);

export default PersonalitiesView;

