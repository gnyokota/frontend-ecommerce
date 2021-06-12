import {
  USER_SIGNIN_ERROR,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  GET_ALL_USERS,
  USER_EDIT_ERROR,
  USER_SIGNOUT,
  User,
  AllUserActions,
} from "../types/types";

type InitialState = {
  user: User | Partial<User> | null;
  errorSignin: Error | null;
  errorRegister: Error | null;
  allUsers: User[];
  errorEditUser: Error | null;
};

const initialState: InitialState = {
  user: null,
  errorSignin: null,
  errorRegister: null,
  allUsers: [],
  errorEditUser: null,
};

export const userReducer = (state = initialState, action: AllUserActions) => {
  switch (action.type) {
  case USER_SIGNIN_SUCCESS:
    return {
      ...state,
      user: action.payload,
    };
  case USER_SIGNIN_ERROR:
    return {
      ...state,
      errorSignin: action.payload,
    };
  case USER_REGISTER_SUCCESS:
    return {
      ...state,
      user: action.payload,
    };
  case USER_REGISTER_ERROR:
    return {
      ...state,
      errorRegister: action.payload,
    };
  case GET_ALL_USERS:
    return {
      ...state,
      allUsers: action.payload,
    };
  case USER_EDIT_ERROR:
    return {
      ...state,
      errorEditUser: action.payload,
    };
  case USER_SIGNOUT:
    return { ...state, user: null, error: null };
  default:
    return state;
  }
};
