import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from './modules/welcome';
import Dashboard from './modules/dashboard';
import Game from './modules/game';
import Master from './modules/master';
import * as dashboardActions from './modules/dashboard/actions';

const Wrapper = styled.div`
  height: 100%;
  font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.retrieveUserRoomCharacter();
  }

  render() {
    const { loggedIn, characterName } = this.props;
    return (
      <Wrapper>
        <Route
          exact
          path="/"
          render={() => (
            loggedIn
              ? <Redirect to="/dashboard" />
              : <Welcome />
          )}
        />
        {/* !loggedIn ? <Redirect to="/" /> : null */}
        <Route
          path="/dashboard"
          render={() => (
            characterName
              ? <Redirect to="/game" />
              : <Dashboard />
          )}
        />
        <Route path="/game" component={Game} />
        <Route path="/master" component={Master} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.welcome.get('loggedIn'),
  characterName: state.game.get('characterName'),
});

const mapDispatchToProps = dispatch => ({
  retrieveUserRoomCharacter: () => {
    dispatch(dashboardActions.retrieveUserRoomCharacter());
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
