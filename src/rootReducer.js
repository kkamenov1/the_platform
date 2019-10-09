import { combineReducers } from 'redux';

// reducers
import header from './pages/Header/reducer';
import app from './app/reducer';

export default combineReducers({
  app,
  header,
});
