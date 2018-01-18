import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmailUsReducer from './EmailUsReducer';
import ChatReducer from './ChatReducer';


export default combineReducers({
  auth: AuthReducer,
  emailUs: EmailUsReducer,
  chat:ChatReducer
});
