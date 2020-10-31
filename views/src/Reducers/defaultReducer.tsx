import DefaultAction from "../Actions/DefaultAction";

// export interface IState {}
// const initialState = {};

export function reducer(state: {}, action: IReduxAction<any>) {
  switch (action.type) {
    case DefaultAction.SUCCEED_TO_DEFAULT_ACTION:
      return Object.assign({}, state, {
        data: action.payload.data
      });
    default:
      return state;
  }
}
