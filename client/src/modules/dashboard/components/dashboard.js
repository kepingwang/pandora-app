import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
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
  padding: 20px 20px;
`;

const RoomNavItem = styled.div`
  padding: 0 10px;
  margin: 10px 0;
  user-select: none;
  cursor: pointer;
`;
const TextSelectARoom = styled.div`
  font-size: 16px;
`;
const Button = styled.button`
  ${() => buttonStyle}
  margin: 10px 10px;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: null,
    };
  }

  componentDidMount() {
    this.props.retrieveRooms();
  }

  handleCharacterNameChange(event) {
    this.setState({
      characterName: event.target.value,
    });
  }

  render() {
    const { rooms, roomName, roomInfo, selectRoom, history, joinRoomMessage } = this.props;
    let roomContent = <TextSelectARoom>Select A Room</TextSelectARoom>;
    if (roomName !== null) {
      roomContent = (
        <div>
          <div>
            {roomName}
          </div>
          <div>{JSON.stringify(roomInfo)}</div>
          <div>
            <label htmlFor={this.emailId}>
              character:
              <input
                id={this.emailId}
                type="text"
                value={this.state.email}
                onChange={e => this.handleCharacterNameChange(e)}
              />
            </label>
            <Button onClick={() => this.props.joinRoom(roomName, this.state.characterName)}>
              Join Game
            </Button>
            {joinRoomMessage
              ? <div>{joinRoomMessage}</div>
              : null}
          </div>
          <div>
            <Button onClick={() => history.push('/master')}>
              Enter As Master
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Wrapper>
        <RoomNav>
          {rooms.map(room => (
            <RoomNavItem
              key={room.get('roomName')}
              onClick={() => selectRoom(room.get('roomName'))}
            >
              {room.get('roomName')}
            </RoomNavItem>
          ))}
        </RoomNav>
        <RoomContentWrapper>
          {roomContent}
        </RoomContentWrapper>
      </Wrapper>
    );
  }
}


export default withRouter(Dashboard);
