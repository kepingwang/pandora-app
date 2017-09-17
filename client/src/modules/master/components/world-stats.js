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

const WorldStats = () => (
  <Wrapper>
    <EventPane>
      Event: comfort woman come out
    </EventPane>
    <StatusPane>
      Players Choosing Personalities...
    </StatusPane>
    <StatsPane>
      <div>tensions: 10</div>
      <div>violence: 20</div>
    </StatsPane>
  </Wrapper>
);

export default WorldStats;
