import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/nav-bar';
import WorldStats from './world-stats';
import CharacterStats from './character-stats';
import buttonStyle from '../../../styles/button-style';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: calc(100% - 30px);
`;

const TopPane = styled.div`
  height: calc(100% - 200px);
  min-height: 200px;
  border-bottom: 1px solid #aaa;
  display: flex;
`;
const MiddlePane = styled.div`
  height: 120px;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const BottomPane = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.5px solid #aaa;
  border-right: 0.5px solid #aaa;
`;
const Button = styled.button`
  ${() => buttonStyle}
  margin: 20px;
`;

class Master extends Component {

  render() {
    const { exitRoom, logout } = this.props;
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
            <CharacterStats />
            <CharacterStats />
            <CharacterStats />
            <CharacterStats />
          </TopPane>
          <MiddlePane>
            <WorldStats />
          </MiddlePane>
          <BottomPane>
            <Button>Stop</Button>
            <Button>Resume</Button>
          </BottomPane>
        </Content>
      </Wrapper>
    );
  }

}


export default Master;
