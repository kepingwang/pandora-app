import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../common/nav-bar';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: calc(100% - 30px);
  display: flex;
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
          This is the master screen.
        </Content>
      </Wrapper>
    );
  }

}


export default Master;
