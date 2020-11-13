import {USER_ACTIONS} from "./actions";

const initial_state = {
}

export const userReducer = (state = initial_state, action:any ) => {
  switch (action.type) {
      case USER_ACTIONS.SET_USER:
          return { ...action.payload };
      default:
          return state;
  }
}