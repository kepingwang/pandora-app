import React from 'react';
import styled from 'styled-components';
import { List } from 'immutable';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const RoomNav = styled.div`
  width: 20%;
  background-color: #aaa;
`;
const RoomContentWrapper = styled.div`
  width: 80%;
  background-color: #147;
`;

const RoomNavItem = styled.div`
  padding: 2px 0 4px;
`;
const TextSelectARoom = styled.span`
  padding: 10px 20px;
  font-size: 16px;
`;

const roomNames = List(['roomA', 'roomB']);

const Dashboard = ({ roomName, roomInfo, selectRoom }) => (
  <Wrapper>
    <RoomNav>
      {roomNames.map(name => (
        <RoomNavItem key={name} onClick={() => selectRoom(name)}>
          {name}
        </RoomNavItem>
      ))}
    </RoomNav>
    <RoomContentWrapper>
      {roomName === null ?
        <TextSelectARoom>Select A Room</TextSelectARoom>
        : JSON.stringify(roomInfo)
      }
    </RoomContentWrapper>
  </Wrapper>
);

export default Dashboard;
