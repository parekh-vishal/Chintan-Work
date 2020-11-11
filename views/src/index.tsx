import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import thunkMiddleware from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import "./index.scss";
import registerServiceWorker from "./registerServiceWorker";
import RootReducer from "./reducers/rootReducer";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const store: any = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
