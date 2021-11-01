import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import urlReducers from './urlReducers'

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  urls: urlReducers
});