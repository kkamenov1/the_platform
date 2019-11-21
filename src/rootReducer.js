import { combineReducers } from 'redux';

// reducers
import header from './pages/Header/reducer';
import app from './app/reducer';
import becomeGuruModal from './components/become-a-guru/reducer';

export default combineReducers({
  app,
  header,
  becomeGuruModal,
});
