import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import dashboardReducers from './modules/dashboard/reducers';
import dashboardSagas from './modules/dashboard/sagas';
import welcomeReducers from './modules/welcome/reducers';
import welcomeSagas from './modules/welcome/sagas';


const reducers = combineReducers({
  dashboard: dashboardReducers,
  welcome: welcomeReducers,
});

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(dashboardSagas);
sagaMiddleware.run(welcomeSagas);

export default store;
