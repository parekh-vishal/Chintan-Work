import {USER_ACTIONS} from "../Actions";

const initial_state = {
}

export const userReducer = (state = initial_state, action:any ) => {
  switch (action.type) {
      case USER_ACTIONS.SET_USER:
          return { ...state, USER: { ...action.payload } };
      case USER_ACTIONS.REMOVE_USER:
            return { ...state, USER: { } };
      default:
          return state;
  }
}