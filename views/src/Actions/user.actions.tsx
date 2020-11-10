import { Dispatch } from "redux";

//
export const USER_ACTIONS = {
  SET_USER: "SET_USER",
  GET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  FAILED_TO_SET_USER: "FAILED_TO_SET_USER",
  FAILED_TO_GET_USER: "FAILED_TO_GET_USER"
};

export const setUser = (payload: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_USER,
        payload: payload
      });
    } catch (err) {
      dispatch({
        type: USER_ACTIONS.FAILED_TO_SET_USER,
        payload: null
      });
    }
  }
};

export const getUser = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: USER_ACTIONS.GET_USER,
      });
    } catch (err) {
      dispatch({
        type: USER_ACTIONS.FAILED_TO_GET_USER,
      });
    }
  }
};

export const userActions = {
  setUser,
  getUser
}