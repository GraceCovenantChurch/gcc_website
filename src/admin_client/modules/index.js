import { combineReducers } from 'redux';
import metadata from '../../client/modules/metadata';
import modelData from './modelData';
import notifications from './notifications';

const rootReducer = combineReducers({
  metadata,
  modelData,
  notifications,
});

export default rootReducer;
