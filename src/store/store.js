import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducer from './root-reducer.js';
import saga from './root-saga.js';
const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

if (devMode) {
  // middleware.push(logger);
}

const store = configureStore({
  reducer: reducer,
  devTools: devMode,
  middleware,
});

sagaMiddleware.run(saga);

export default store;
