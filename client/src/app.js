import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './modules/dashboard';
import Welcome from './modules/welcome';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => (
  <Wrapper>
    <Route exact path="/" component={Welcome} />
    <Route path="/dashboard" component={Dashboard} />
  </Wrapper>
);

export default App;
