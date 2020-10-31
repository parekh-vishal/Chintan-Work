import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import thunkMiddleware from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import "./index.scss";
import registerServiceWorker from "./registerServiceWorker";
import RootReducer from "./Reducers/rootReducer";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
