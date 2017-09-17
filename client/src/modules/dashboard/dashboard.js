import React, { Component } from 'react';
import styled from 'styled-components';
import { List } from 'immutable';
import NavBar from '../common/nav-bar';
import Form from '../common/form';
import Table from '../common/table';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: calc(100% - 30px);
  display: flex;
`;

const RoomNav = styled.div`
  width: 20%;
  border-right: 1px solid #aaa;
`;
const RoomContentWrapper = styled.div`
  width: 80%;
  padding: 20px 20px;
`;

const RoomNavItem = styled.div`
  padding: 10px 20px;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  color: ${props => (props.selected ? '#000' : '#aaa')};
  :hover {
    color: #000;
  }
  :active {
    box-shadow: inset 0 0 3px 1px;
  }
`;

const TextSelectARoom = styled.div`
  font-size: 16px;
`;

const RoomNameTitle = styled.h2`
  text-align: center;
`;
const RoomDescription = styled.h4`
  text-align: center;
`;

class Dashboard extends Component {

  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    const { rooms, roomName, roomDescription, roomCharacters,
      selectRoom, joinRoomMessage, logout, joinRoom } = this.props;

    let roomContent = <TextSelectARoom>Select A Room</TextSelectARoom>;
    if (roomName !== null) {
      roomContent = (
        <div>
          <RoomNameTitle>{roomName}</RoomNameTitle>
          <RoomDescription>{roomDescription}</RoomDescription>
          <Table
            headers={['character', 'player']}
            data={roomCharacters.map(ch => (
              List([ch.get('characterName'), ch.get('email')])
            ))}
          />
          <Form
            message={joinRoomMessage}
            fields={[
              { name: 'character' },
              { name: 'token', type: 'password' },
            ]}
            button={{
              name: 'Join Game',
              submit: ({ character, token }) =>
                joinRoom({
                  roomName,
                  characterName: character,
                  token,
                }),
            }}
          />
        </div>
      );
    }

    return (
      <Wrapper>
        <NavBar
          buttons={[
            { name: 'Logout', onClick: () => logout() },
          ]}
        />
        <Content>
          <RoomNav>
            {rooms.map(room => (
              <RoomNavItem
                key={room}
                onClick={() => selectRoom({ roomName: room })}
                selected={room === roomName}
              >
                {room}
              </RoomNavItem>
            ))}
          </RoomNav>
          <RoomContentWrapper>
            {roomContent}
          </RoomContentWrapper>
        </Content>
      </Wrapper>
    );
  }
}


export default Dashboard;
