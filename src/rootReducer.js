import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// reducers
import header from './pages/Header/reducer';
import app from './app/reducer';
import becomeGuruModal from './modals/become-guru/reducer';
import authModal from './modals/auth/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app,
  header,
  becomeGuruModal,
  authModal,
});

export default createRootReducer;
