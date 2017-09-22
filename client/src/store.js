import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducers from './modules/app/reducers';
import appSagas from './modules/app/sagas';
import dashboardReducers from './modules/dashboard/reducers';
import dashboardSagas from './modules/dashboard/sagas';
import welcomeReducers from './modules/welcome/reducers';
import gameReducers from './modules/game/reducers';
import gameSagas from './modules/game/sagas';
import masterReducers from './modules/master/reducers';
import masterSagas from './modules/master/sagas';

const reducers = combineReducers({
  app: appReducers,
  dashboard: dashboardReducers,
  welcome: welcomeReducers,
  game: gameReducers,
  master: masterReducers,
});

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(appSagas);
sagaMiddleware.run(dashboardSagas);
sagaMiddleware.run(gameSagas);
sagaMiddleware.run(masterSagas);

export default store;
