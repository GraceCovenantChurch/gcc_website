import { combineReducers } from 'redux';
import metadata from './metadata';
import page from './page';

const rootReducer = combineReducers({
  metadata,
  page,
});

export default rootReducer;
