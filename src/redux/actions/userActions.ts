import { Dispatch } from "redux";
import axios from "axios";

import {
  USER_SIGNIN_ERROR,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
  GET_ALL_USERS,
  User,
  AllUserActions,
} from "../types/types";

export const signinSuccess = (user: Partial<User>): AllUserActions => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: user,
  };
};

export const signinError = (error: Error | null): AllUserActions => {
  return {
    type: USER_SIGNIN_ERROR,
    payload: error,
  };
};

export const registerSuccess = (user: User): AllUserActions => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerError = (error: Error | null): AllUserActions => {
  return {
    type: USER_REGISTER_ERROR,
    payload: error,
  };
};

export const getAllUsers = (user: User[]): AllUserActions => {
  return {
    type: GET_ALL_USERS,
    payload: user,
  };
};

export const editUserSuccess = (user: User): AllUserActions => {
  return {
    type: USER_EDIT_SUCCESS,
    payload: user,
  };
};

export const editUserError = (error: Error | null): AllUserActions => {
  return {
    type: USER_EDIT_ERROR,
    payload: error,
  };
};

export const userSignout = () => {
  return {
    type: USER_SIGNOUT,
  };
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(
      "https://ecommerce-pantanal.herokuapp.com/api/v1/users"
    );
    dispatch(getAllUsers(data));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editUser =
  (
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/users/${userId}`,
        {
          firstName,
          lastName,
          email,
          password,
          isAdmin,
        }
      );
      dispatch(editUserSuccess(data));
    } catch (error) {
      dispatch(editUserError(error));
    }
  };

export const signin =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-pantanal.herokuapp.com/api/v1/users/signin",
        { email, password }
      );
      dispatch(signinSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(signinError(error));
    }
  };

export const register =
  (firstName: string, lastName: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-pantanal.herokuapp.com/api/v1/users",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      dispatch(registerSuccess(data));
      dispatch(signinSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(registerError(error));
    }
  };

export const signout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  //later clean the user cart
  dispatch(userSignout());
};
