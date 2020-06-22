import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// reducers
import header from './pages/Header/reducer';
import app from './app/reducer';
import application from './pages/Application/rootReducer';
import authModal from './modals/auth/reducer';
import admin from './pages/Admin/reducer';
import listing from './pages/Listing/reducer';
import gdp from './pages/GDP/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app,
  header,
  application,
  authModal,
  admin,
  listing,
  gdp,
});

export default createRootReducer;
