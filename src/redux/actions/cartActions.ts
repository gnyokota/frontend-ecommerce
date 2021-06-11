import { Dispatch } from "redux";
import axios from "axios";
import {
  TOGGLE_CART,
  CART_QTY,
  CREATE_CART_ERROR,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  DELETE_PRODUCT_CART_ERROR,
  DELETE_CART,
  DELETE_CART_ERROR,
  AllCartActions,
  Cart,
} from "../types/types";

export const toggleCart = (isOpen: boolean): AllCartActions => {
  return {
    type: TOGGLE_CART,
    payload: isOpen,
  };
};

export const addCartQty = (qty: number): AllCartActions => {
  return {
    type: CART_QTY,
    payload: qty,
  };
};

export const getCartSuccess = (userCart: Cart): AllCartActions => {
  return {
    type: GET_CART_SUCCESS,
    payload: userCart,
  };
};

export const createCartError = (error: Error): AllCartActions => {
  return {
    type: CREATE_CART_ERROR,
    payload: error,
  };
};

export const getCartError = (error: Error): AllCartActions => {
  return {
    type: GET_CART_ERROR,
    payload: error,
  };
};

export const deleteProductCartError = (error: Error): AllCartActions => {
  return {
    type: DELETE_PRODUCT_CART_ERROR,
    payload: error,
  };
};

export const deleteCart = (): AllCartActions => {
  return {
    type: DELETE_CART,
  };
};

export const deleteCartError = (error: Error): AllCartActions => {
  return {
    type: DELETE_CART_ERROR,
    payload: error,
  };
};

export const createCart =
  (productId: string, qty: number) => (dispatch: Dispatch) => {
    try {
      const temp = JSON.parse(localStorage.getItem("userInfo") as string);
      const userId = temp.id;

      axios.post(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/cart/${userId}`,
        {
          productId,
          qty,
        }
      );
    } catch (error) {
      dispatch(createCartError(error));
    }
  };

export const getCart = () => async (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const userId = temp.id;

    const { data } = await axios.get(
      `https://ecommerce-pantanal.herokuapp.com/api/v1/cart/${userId}`
    );
    dispatch(getCartSuccess(data));
  } catch (error) {
    dispatch(getCartError(error));
  }
};

export const deleteProductCart =
  (productId: string) => async (dispatch: Dispatch) => {
    try {
      const temp = JSON.parse(localStorage.getItem("userInfo") as string);
      const userId = temp.id;

      axios.put(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/cart/${userId}/${productId}`
      );
    } catch (error) {
      dispatch(deleteProductCartError(error));
    }
  };

export const cleanCart = () => (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const userId = temp.id;

    axios.delete(
      `https://ecommerce-pantanal.herokuapp.com/api/v1/cart/${userId}`
    );
    dispatch(deleteCart());
  } catch (error) {
    dispatch(deleteCartError(error));
  }
};
