import { combineReducers } from "redux";

// import * as defaultReducer from "./defaultReducer";

// export interface IAppState {
//   default: defaultReducer.IState;
// }

const reducers = combineReducers<any>({
  // default: defaultReducer.reducer
});

export default reducers;
