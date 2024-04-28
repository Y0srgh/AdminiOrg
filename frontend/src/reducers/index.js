// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Other reducers if you have them
});

export default rootReducer;
