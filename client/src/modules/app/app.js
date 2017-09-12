import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from '../welcome';
import Dashboard from '../dashboard';
import Game from '../game';
import Master from '../master';


const Wrapper = styled.div`
  height: 100%;
  font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
`;

class App extends Component {

  componentDidMount() {
    this.props.fetchUserInfo();
  }

  render() {
    const { loading, email, master, roomName } = this.props;
    if (loading) {
      return <div />;
    }

    let root = <Welcome />;
    if (email) {
      if (!roomName) {
        root = <Redirect to="/dashboard" />;
      } else if (master) {
        root = <Redirect to="/master" />;
      } else {
        root = <Redirect to="/game" />;
      }
    }

    let dashboard = <Dashboard />;
    if (!email) {
      dashboard = <Redirect to="/" />;
    } else if (roomName) {
      if (master) {
        dashboard = <Redirect to="/master" />;
      } else {
        dashboard = <Redirect to="/game" />;
      }
    }

    let game = <Game />;
    if (!email) {
      game = <Redirect to="/" />;
    } else if (!roomName) {
      game = <Redirect to="/dashboard" />;
    } else if (master) {
      game = <Redirect to="/master" />;
    }

    let masterScreen = <Master />;
    if (!email) {
      masterScreen = <Redirect to="/" />;
    } else if (!roomName) {
      masterScreen = <Redirect to="/dashboard" />;
    } else if (!master) {
      masterScreen = <Redirect to="/game" />;
    }

    return (
      <Wrapper>
        <Route exact path="/" render={() => root} />
        <Route path="/dashboard" render={() => dashboard} />
        <Route path="/game" render={() => game} />
        <Route path="/master" render={() => masterScreen} />
      </Wrapper>
    );
  }
}

export default App;
