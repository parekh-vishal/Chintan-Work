import { combineReducers } from "redux";

import {userReducer} from "./userReducer";

// export interface IAppState {
//   default: defaultReducer.IState;
// }

const reducers = combineReducers<any>({
  user: userReducer
});

export default reducers;
