import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
// import routesReducer from './reducers/routesSlice';

const appReducer = combineReducers({
  auth: userReducer,
  // routes: routesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
