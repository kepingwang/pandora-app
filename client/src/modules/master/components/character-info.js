import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 25%;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const TitleText = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 13px;
  padding: 3px;
`;
const Text = styled.div`
  text-align: center;
  font-size: 12px;
  padding: 0 5px;
`;

const CharacterInfo = ({ character }) => (
  <Wrapper>
    <TitleText>{character.get('characterName')}</TitleText>
    <Text>{character.get('description')}</Text>
    <Text>{character.get('email')}</Text>
    <Text>token: {character.get('token')}</Text>
    <Text>Goal: {character.get('goal')}</Text>
    <TitleText>Stats: </TitleText>
    <Text>affluence: {character.getIn(['stats', 'affluence'])}</Text>
    <Text>influence: {character.getIn(['stats', 'influence'])}</Text>
    <Text>wellbeing: {character.getIn(['stats', 'wellbeing'])}</Text>
    <Text>positive coins: {character.getIn(['stats', 'positiveCoins'])}</Text>
    <Text>neutral coins: {character.getIn(['stats', 'neutralCoins'])}</Text>
    <Text>negative coins: {character.getIn(['stats', 'negativeCoins'])}</Text>
    <TitleText>Emotions: </TitleText>
    {character.getIn(['attrs', 'emotions']).map(attr => (
      <Text>{attr.get('name')} ({attr.get('intensity')})</Text>
    ))}
    <TitleText>Beliefs: </TitleText>
    {character.getIn(['attrs', 'beliefs']).map(attr => (
      <Text>{attr.get('name')} ({attr.get('intensity')})</Text>
    ))}
    <TitleText>Personalities: </TitleText>
    {character.getIn(['attrs', 'personalities']).map(attr => (
      <Text>{attr.get('name')} ({attr.get('intensity')})</Text>
    ))}
    <TitleText>Actions: </TitleText>
    {character.get('actions').map(action => (
      <Text>{action}</Text>
    ))}
  </Wrapper>
);

export default CharacterInfo;
