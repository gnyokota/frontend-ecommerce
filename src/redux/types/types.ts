//cart types
export const TOGGLE_CART = "TOGGLE_CART";
export const CART_PRODUCT_ID = "CART_PRODUCT_ID";
export const CART_USER_ID = "CART_USER_ID";
export const CART_QTY = "ADD_TO_CART ";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_ERROR = "GET_CART_ERROR";
export const CREATE_CART_ERROR = "CREATE_CART_ERROR";
export const DELETE_PRODUCT_CART_ERROR = "DELETE_PRODUCT_CART_ERROR";
export const DELETE_CART = "DELETE_CART";
export const DELETE_CART_ERROR = "DELETE_CART_ERROR";

export type Cart = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  items: [
    {
      qty: number;
      _id: string;
      product: {
        variant: {
          price: number;
        };
        _id: string;
        title: string;
        image: string;
      };
    }
  ];
};

type ToggleCart = {
  type: typeof TOGGLE_CART;
  payload: boolean;
};

type AddQty = {
  type: typeof CART_QTY;
  payload: number;
};

type GetCartSuccess = {
  type: typeof GET_CART_SUCCESS;
  payload: Cart;
};

type GetCartError = {
  type: typeof GET_CART_ERROR;
  payload: Error | null;
};

type CreateCartError = {
  type: typeof CREATE_CART_ERROR;
  payload: Error | null;
};

type DeleteProductCartError = {
  type: typeof DELETE_PRODUCT_CART_ERROR;
  payload: Error | null;
};

type DeleteCart = {
  type: typeof DELETE_CART;
};

type DeleteCartError = {
  type: typeof DELETE_CART_ERROR;
  payload: Error | null;
};

export type AllCartActions =
  | ToggleCart
  | AddQty
  | GetCartSuccess
  | GetCartError
  | CreateCartError
  | DeleteProductCartError
  | DeleteCart
  | DeleteCartError;

//product
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_DETAILS_SUCCESS = "FETCH_PRODUCT_DETAILS_SUCESS";
export const FETCH_PRODUCT_DETAILS_ERROR = "FETCH_PRODUCT_DETAILS_ERROR";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const FILTER_PRODUCT = "FILTER_PRODUCT";
export const HANDLE_SEARCH_PRODUCT = "HANDLE_SEARCH_PRODUCT";
export const EDIT_PRODUCT_ERROR = "EDIT_PRODUCT_ERROR";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";

export type CreateProduct = {
  title: string;
  description: string;
  category: string;
  countInStock: number;
  price: number;
  color?: string;
  size?: string;
  image: string;
};

export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  countInStock: number;
  variant: {
    price: number;
    color: string;
    size: string;
  };
  image: string;
  generalRating: number;
  reviews: Review[];
};

export type User = {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
  password?: string;
};

export type FetchStatus = {
  status: number;
  statusText: string;
};

type FetchProductsSuccess = {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
};

type FetchProductsError = {
  type: typeof FETCH_PRODUCTS_ERROR;
  payload: Error | null;
};

type CreateProductError = {
  type: typeof CREATE_PRODUCT_ERROR;
  payload: Error | null;
};

type FetchProductDetailsSuccess = {
  type: typeof FETCH_PRODUCT_DETAILS_SUCCESS;
  payload: Product;
};

type FetchProductDetailsError = {
  type: typeof FETCH_PRODUCT_DETAILS_ERROR;
  payload: Error | null;
};

type FilterProduct = {
  type: typeof FILTER_PRODUCT;
  payload: Product[];
};

type HandleSearchProduct = {
  type: typeof HANDLE_SEARCH_PRODUCT;
  payload: string;
};

type CreateReview = {
  type: typeof CREATE_REVIEW;
  payload: Review;
};

type EditProduct = {
  type: typeof EDIT_PRODUCT_ERROR;
  payload: Error | null;
};

type DeleteProductError = {
  type: typeof DELETE_PRODUCT_ERROR;
  payload: Error | null;
};

export type AllProductActions =
  | FetchProductsSuccess
  | FetchProductsError
  | CreateProductError
  | FetchProductDetailsSuccess
  | FetchProductDetailsError
  | FilterProduct
  | HandleSearchProduct
  | CreateReview
  | EditProduct
  | DeleteProductError;

//User
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";
export const USER_SIGNOUT = "USER_SIGNOUT ";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const GET_ALL_USERS = "GET_ALL_USERS ";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS ";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR ";

type getAllUsers = {
  type: typeof GET_ALL_USERS;
  payload: User[];
};

type editUserSuccess = {
  type: typeof USER_EDIT_SUCCESS;
  payload: User;
};

type editUserError = {
  type: typeof USER_EDIT_ERROR;
  payload: Error | null;
};

type signinSuccess = {
  type: typeof USER_SIGNIN_SUCCESS;
  payload: Partial<User>;
};

type signinError = {
  type: typeof USER_SIGNIN_ERROR;
  payload: Error | null;
};

type userSignout = {
  type: typeof USER_SIGNOUT;
};

type registerSuccess = {
  type: typeof USER_REGISTER_SUCCESS;
  payload: User;
};

type registerError = {
  type: typeof USER_REGISTER_ERROR;
  payload: Error | null;
};

export type AllUserActions =
  | signinSuccess
  | signinError
  | userSignout
  | registerSuccess
  | getAllUsers
  | editUserSuccess
  | editUserError
  | registerError;

//app state

export type AppState = {
  cart: {
    isOpen: boolean;
    qty: number;
    errorCreateCart: Error | null;
    userCart: string | Cart;
    errorGetCart: Error | null;
    errorDeleteProductCart: Error | null;
    errorDeleteCart: Error | null;
  };
  product: {
    products: Product[];
    filteredProducts: Product[];
    searchField: string;
    error: Error | null;
    productDetail: Product | string;
    errorDetail: Error | null;
    errorCreateProduct: Error | null;
    errorEditProduct: Error | null;
    errorDeleteProduct: Error | null;
  };
  user: {
    user: User | Partial<User> | null;
    errorSignin: Error | null;
    errorRegister: Error | null;
    allUsers: User[];
    errorEditUser: Error | null;
  };
};
