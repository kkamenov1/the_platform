import { combineReducers } from 'redux';
import general from './reducer';
import personalDetails from './steps/personal-details-step/reducer';
import guruDetails from './steps/guru-details-step/reducer';
import rates from './steps/rates-step/reducer';
import socialMedia from './steps/social-media-step/reducer';


export default combineReducers({
  general,
  personalDetails,
  guruDetails,
  rates,
  socialMedia,
});
