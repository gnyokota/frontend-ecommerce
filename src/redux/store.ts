import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";
import { AppState } from "./types/types";

const middleware = [thunk];
const devtools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState: AppState = {
  cart: {
    isOpen: false,
    qty: 1,
    errorCreateCart: null,
    userCart: "",
    errorGetCart: null,
    errorDeleteProductCart: null,
    errorDeleteCart: null,
  },
  product: {
    products: [],
    filteredProducts: [],
    searchField: "",
    error: null,
    productDetail: "",
    errorDetail: null,
    errorCreateProduct: null,
    errorEditProduct: null,
    errorDeleteProduct: null,
  },
  user: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
    errorSignin: null,
    errorRegister: null,
    allUsers: [],
    errorEditUser: null,
  },
};

const store = createStore(
  rootReducer(),
  initialState,
  devtools(applyMiddleware(...middleware))
);

export default store;
