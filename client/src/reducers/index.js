import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import standups from './standups';

const rootReducer = combineReducers({
  standups,
  routing,
  form,
});

export default rootReducer;
