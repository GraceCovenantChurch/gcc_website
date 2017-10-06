import { combineReducers } from 'redux';
import metadata from '../../client/modules/metadata';
import modelData from './modelData';

const rootReducer = combineReducers({
  metadata,
  modelData,
});

export default rootReducer;
