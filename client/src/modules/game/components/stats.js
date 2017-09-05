import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 16px;
  border-bottom: 1px solid #aaa;
  padding: 3px 5px;
`;
const Item = styled.div`
  padding: 2px 0;
`;
const Spacing = styled.div`
  padding-top: 15px;
`;

const Stats = ({ stats }) => (
  <Wrapper>
    <Item>Tension: {stats.get('tension')}</Item>
    <Item>Violence: {stats.get('violence')}</Item>
    <Spacing />
    <Item>Affluence: {stats.get('affluence')}</Item>
    <Item>Influence: {stats.get('influence')}</Item>
    <Item>Well-Being: {stats.get('wellBeing')}</Item>
    <Spacing />
    <Item>Positive Coins: {stats.get('coinsPositive')}</Item>
    <Item>Neutral Coins: {stats.get('coinsNeutral')}</Item>
    <Item>Negative Coins: {stats.get('coinsNegative')}</Item>
  </Wrapper>
);

export default Stats;
