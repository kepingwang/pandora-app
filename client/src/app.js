import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Welcome from './modules/welcome';
import Dashboard from './modules/dashboard';
import Game from './modules/game';
import Master from './modules/master';

const Wrapper = styled.div`
  height: 100%;
  font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
`;

const App = () => (
  <Wrapper>
    <Route exact path="/" component={Welcome} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/game" component={Game} />
    <Route path="/master" component={Master} />
  </Wrapper>
);

export default App;
