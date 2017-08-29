import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Welcome from './pages/welcome';

const App = () => (
  <div>
    <Route exact path="/" component={Welcome} />
    <Route path="/dashboard" component={Dashboard} />
  </div>
);

export default App;
