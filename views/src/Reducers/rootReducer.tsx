import { combineReducers } from "redux";

import {userReducer} from "./userReducer";

const reducers = combineReducers<any>({
  user: userReducer
});

export default reducers;
