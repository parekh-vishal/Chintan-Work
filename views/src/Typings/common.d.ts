interface IReduxAction<T> {
  type: string;
  payload?: T;
}
