/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@gmail.com
*/
import { ServerEndPoint } from "../Configs/Server";

import axios from "axios";

export interface IRequestParams {
  url: string;
  headers?: object;
  body?: object;
}

export const get = (
  { url, headers, body }: IRequestParams,
  callback?: () => void
) => {
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
      throw new Error();
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
      throw new Error();
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
      throw new Error();
    });
};
