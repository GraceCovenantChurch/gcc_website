import { combineReducers } from 'redux';
import metadata from './metadata';
import modelData from './modelData';
import page from './page';

const rootReducer = combineReducers({
  metadata,
  modelData,
  page,
});

export default rootReducer;
