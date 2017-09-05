import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { List } from 'immutable';
import buttonStyle from '../../../styles/button-style';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const RoomNav = styled.div`
  width: 20%;
  border-right: 1px solid #aaa;
`;
const RoomContentWrapper = styled.div`
  width: 80%;
`;

const RoomNavItem = styled.div`
  padding: 2px 0 4px;
`;
const TextSelectARoom = styled.span`
  padding: 10px 20px;
  font-size: 16px;
`;
const Button = styled.button`
  ${() => buttonStyle}
  margin: 10px;
`;

const roomNames = List(['roomA', 'roomB']);

const Dashboard = ({ roomName, roomInfo, selectRoom, history }) => {
  let roomContent = <TextSelectARoom>Select A Room</TextSelectARoom>;
  if (roomName !== null) {
    roomContent = (
      <div>
        <div>
          {roomName}
        </div>
        <div>{JSON.stringify(roomInfo)}</div>
        <Button onClick={() => history.push('/game')}>Join Game</Button>
        <Button onClick={() => history.push('/master')}>Enter As Master</Button>
      </div>
    );
  }

  return (
    <Wrapper>
      <RoomNav>
        {roomNames.map(name => (
          <RoomNavItem key={name} onClick={() => selectRoom(name)}>
            {name}
          </RoomNavItem>
        ))}
      </RoomNav>
      <RoomContentWrapper>
        {roomContent}
      </RoomContentWrapper>
    </Wrapper>
  );
};

export default withRouter(Dashboard);
