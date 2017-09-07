import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from './modules/welcome';
import Dashboard from './modules/dashboard';
import Game from './modules/game';
import Master from './modules/master';

const Wrapper = styled.div`
  height: 100%;
  font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
`;

const App = ({ loggedIn }) => (
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
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/game" component={Game} />
    <Route path="/master" component={Master} />
  </Wrapper>
);

const mapStateToProps = state => ({
  loggedIn: state.welcome.get('loggedIn'),
});

export default withRouter(connect(mapStateToProps, null)(App));
