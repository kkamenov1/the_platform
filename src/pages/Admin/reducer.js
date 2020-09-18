import { combineReducers } from 'redux';
import applications from './panels/applications/reducer';
import reviews from './panels/reviews/reducer';

export default combineReducers({
  applications,
  reviews,
});
