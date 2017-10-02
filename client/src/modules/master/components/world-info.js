import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;
const EventPane = styled.div`
  padding: 20px;
  width: 30%;
`;
const StatusPane = styled.div`
  padding: 20px;
  width: 40%;
  font-size: 20px;
`;
const StatsPane = styled.div`
  padding: 20px;
  width: 30%;
`;

const WorldInfo = ({ roomName, description, gameRound, gameStatus, globalStats }) => (
  <Wrapper>
    <EventPane>
      <div>gameRound: {gameRound}</div>
      <div>gameStatus: {gameStatus}</div>
    </EventPane>
    <StatusPane>
      <div>{roomName}</div>
      <div>{description}</div>
    </StatusPane>
    <StatsPane>
      <div>tension: {globalStats.get('tension')}</div>
      <div>violence: {globalStats.get('violence')}</div>
    </StatsPane>
  </Wrapper>
);

export default WorldInfo;
