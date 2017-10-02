import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/nav-bar';
import WorldInfo from './world-info';
import CharacterInfo from './character-info';
import buttonStyle from '../../../styles/button-style';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: calc(100% - 30px);
`;

const TopPane = styled.div`
  height: calc(100% - 210px);
  min-height: 200px;
  border-bottom: 1px solid #aaa;
  display: flex;
`;
const MiddlePane = styled.div`
  height: 150px;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const BottomPane = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const Button = styled.button`
  ${() => buttonStyle}
`;

class Master extends Component {

  componentDidMount() {
    this.props.syncGameInfo();
  }

  render() {
    const {
      characters, roomName, description, gameRound, gameStatus, globalStats, paused,
      exitRoom, logout,
    } = this.props;
    return (
      <Wrapper>
        <NavBar
          buttons={[
            { name: 'Dashboard', onClick: () => exitRoom() },
            { name: 'Logout', onClick: () => logout() },
          ]}
        />
        <Content>
          <TopPane>
            {characters.map((character, idx) => (
              <CharacterInfo key={idx} character={character} />
            ))}
          </TopPane>
          <MiddlePane>
            <WorldInfo {...{ roomName, description, gameRound, gameStatus, globalStats }} />
          </MiddlePane>
          <BottomPane>
            {
              paused
              ? <Button disabled>Resume</Button>
              : <Button disabled>Pause</Button>
            }
          </BottomPane>
        </Content>
      </Wrapper>
    );
  }

}


export default Master;
