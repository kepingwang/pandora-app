import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px 10px;
`;
const EventTitle = styled.div`
  font-size: 16px;
  font-weight: bold;

`;
const EventContent = styled.div`
  font-size: 14px;
`;

const Event = ({ event }) => (
  <Wrapper>
    <EventTitle>Event: {event.get('name')}</EventTitle>
    <EventContent>{event.get('description')}</EventContent>
  </Wrapper>
);

export default Event;
