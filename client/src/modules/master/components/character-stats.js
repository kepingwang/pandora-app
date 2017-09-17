import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 25%;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const ActionsPane = styled.div`
  text-align: center;
  padding: 10px;
`;
const StatsPane = styled.div`
  text-align: center;
  height: 30%;
  padding: 10px;
`;

const CharacterStats = () => (
  <Wrapper>
    <StatsPane>
      <div>influence: 10</div>
      <div>affluence: 20</div>
      <div>well-being: 30</div>
    </StatsPane>
    <ActionsPane>
      <div>action 1: watch TV</div>
      <div>action 2: fly a plane</div>
    </ActionsPane>
  </Wrapper>
);

export default CharacterStats;
