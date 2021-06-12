import {
  TOGGLE_CART,
  AllCartActions,
  CART_QTY,
  CREATE_CART_ERROR,
  Cart,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  DELETE_PRODUCT_CART_ERROR,
  DELETE_CART_ERROR,
  DELETE_CART,
} from "../types/types";

const initialState: InitialState = {
  isOpen: false,
  qty: 1,
  errorCreateCart: null,
  userCart: "",
  errorGetCart: null,
  errorDeleteProductCart: null,
  errorDeleteCart: null,
};

export type InitialState = {
  isOpen: boolean;
  qty: number;
  errorCreateCart: Error | null;
  userCart: Cart | string;
  errorGetCart: Error | null;
  errorDeleteProductCart: Error | null;
  errorDeleteCart: Error | null;
};

const cartReducer = (state = initialState, action: AllCartActions) => {
  switch (action.type) {
  case TOGGLE_CART:
    return {
      ...state,
      isOpen: action.payload,
    };
  case CART_QTY:
    return {
      ...state,
      qty: action.payload,
    };
  case CREATE_CART_ERROR:
    return {
      ...state,
      errorCreateCart: action.payload,
    };
  case GET_CART_SUCCESS:
    return {
      ...state,
      userCart: action.payload,
    };
  case GET_CART_ERROR:
    return {
      ...state,
      errorGetCart: action.payload,
    };
  case DELETE_PRODUCT_CART_ERROR:
    return {
      ...state,
      errorDeleteProductCart: action.payload,
    };
  case DELETE_CART:
    return {
      ...state,
      userCart: "",
    };
  case DELETE_CART_ERROR:
    return {
      ...state,
      errorDeleteCart: action.payload,
    };
  default:
    return state;
  }
};

export default cartReducer;
