import { combineReducers } from 'redux';
import { auth } from './auth';
import { employees } from './employees';
import { departments } from './departments';

export default combineReducers({
  auth,
  employees,
  departments
});
