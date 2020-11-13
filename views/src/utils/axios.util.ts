import axios from "axios";
import { ServerEndPoint } from "../configs/server";
import {store} from "../reducers/store";

export interface IRequestParams {
  url: string;
  headers?: object;
  body?: object;
}

axios.interceptors.request.use( req => {
    const user = store && store.getState().user;    
    if(req.headers && user && user.token){
      req.headers = {...req.headers, Authorization: `Bearer ${user.token}`};
    }
    return req;
  }
);

export const get = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  console.log(store.getState())
  return axios({
    method: "GET",
    url: ServerEndPoint + url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    })
    .catch(err => {
      let errorMsg = "ERROR\n\n Error while processing data";
      if (err.response) {
        errorMsg = `ERROR\n\n${err.response.data.message}`
      }      
      alert(errorMsg);
    });
};

export const post = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  return axios({
    method: "POST",
    url: ServerEndPoint + url,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    })
    .catch(err => {
      let errorMsg = "ERROR\n\n Error while processing data";
      if (err.response) {
        errorMsg = `ERROR\n\n${err.response.data.message}`
      }      
      alert(errorMsg);
      throw new Error(errorMsg);
    });
};

export const del = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
  return axios({
    method: "DELETE",
    url: ServerEndPoint + url,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(res => {
      if (callback) {
        callback();
      }
      return res;
    })
    .catch(err => {
      let errorMsg = "ERROR\n\n Error while processing data";
      if (err.response) {
        errorMsg = `ERROR\n\n${err.response.data.message}`
      }      
      alert(errorMsg);
      throw new Error(errorMsg);
    });
};
