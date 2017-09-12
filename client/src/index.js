import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './modules/app';
import registerServiceWorker from './utils/registerServiceWorker';
import runSocket from './run-socket';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
),
  document.getElementById('root'),
);
registerServiceWorker();
runSocket();
