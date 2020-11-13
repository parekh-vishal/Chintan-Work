import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import RootReducer from "./rootReducer";
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

export const store: any = createStoreWithMiddleware(persistedReducer);