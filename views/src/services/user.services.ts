import { get, post } from "../utils/WebRequestUtil";
import {LoginTypes, SignUpTypes} from "../typings"

export const login = (loginParam: LoginTypes) => {
    return post({ url: 'admin/SignIn', body: loginParam })
};

export const signUp = (signupParam: SignUpTypes) => {
    return post({ url: 'admin/SignUp', body: signupParam })
};

export const getUserDetails = ({email, token}: any) => {
    return get({ url: `admin/getUsr/${email}`, headers: {Authorization: `Bearer ${token}`}})
};
  