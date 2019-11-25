import { combineReducers } from 'redux';

// reducers
import header from './pages/Header/reducer';
import app from './app/reducer';
import becomeGuruModal from './modals/become-guru/reducer';
import authModal from './modals/auth/reducer';

export default combineReducers({
  app,
  header,
  becomeGuruModal,
  authModal,
});
