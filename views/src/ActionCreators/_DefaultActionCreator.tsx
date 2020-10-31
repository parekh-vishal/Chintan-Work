/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/

import { Dispatch } from "redux";

import DefaultAction from "../Actions/DefaultAction";
// import * as DefaultAPI from "../API/DefaultAPI";

export function action() {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: DefaultAction.START_TO_DEFAULT_ACTION
      });
      // const data = await DefaultAPI.getTest();
      dispatch({
        type: DefaultAction.SUCCEED_TO_DEFAULT_ACTION,
        payload: {
          // data
        }
      });
    } catch (err) {
      dispatch({
        type: DefaultAction.FAILED_TO_DEFAULT_ACTION
      });
    }
  };
}
