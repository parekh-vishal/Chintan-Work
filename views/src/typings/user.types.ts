export interface LoginTypes {
  email: string;
  password: string;
}


export interface SignUpTypes {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: number;
  password: string;
}

export interface UserTypes extends Omit<SignUpTypes, 'password'>{
  user_id: string;
  _id: string;
  __v: number;
}
