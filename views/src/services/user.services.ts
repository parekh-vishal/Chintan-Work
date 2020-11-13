import { get, post } from "../utils/axios.util";
import {LoginTypes, SignUpTypes} from "../typings"

export const login = (loginParam: LoginTypes) => {
    return post({ url: 'admin/SignIn', body: loginParam })
};

export const signUp = (signupParam: SignUpTypes) => {
    return post({ url: 'admin/SignUp', body: signupParam })
};

export const getUserDetails = ({email}: any) => {
    return get({ url: `admin/getUsr/${email}`})
};
  