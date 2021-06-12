import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_ERROR,
  FILTER_PRODUCT,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  AllProductActions,
  Product,
  HANDLE_SEARCH_PRODUCT,
  EDIT_PRODUCT_ERROR,
} from "../types/types";

type InitialState = {
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

const initialState: InitialState = {
  products: [],
  filteredProducts: [],
  searchField: "",
  error: null,
  productDetail: "",
  errorDetail: null,
  errorCreateProduct: null,
  errorEditProduct: null,
  errorDeleteProduct: null,
};

const productReducer = (
  state = initialState,
  action: AllProductActions
): InitialState => {
  switch (action.type) {
  case FETCH_PRODUCTS_SUCCESS:
    return { ...state, products: action.payload };
  case FETCH_PRODUCTS_ERROR:
    return { ...state, error: action.payload };
  case FETCH_PRODUCT_DETAILS_SUCCESS:
    return { ...state, productDetail: action.payload };
  case FETCH_PRODUCT_DETAILS_ERROR:
    return { ...state, errorDetail: action.payload };
  case FILTER_PRODUCT:
    return { ...state, filteredProducts: action.payload };
  case CREATE_PRODUCT_ERROR:
    return { ...state, errorCreateProduct: action.payload };
  case EDIT_PRODUCT_ERROR:
    return { ...state, errorEditProduct: action.payload };
  case DELETE_PRODUCT_ERROR:
    return { ...state, errorDeleteProduct: action.payload };
  case HANDLE_SEARCH_PRODUCT:
    return {
      ...state,
      searchField: action.payload,
      filteredProducts: state.products.filter((product: Product) =>
        product.title
          .toLowerCase()
          .trim()
          .includes(action.payload.toLocaleLowerCase().trim())
      ),
    };
  default:
    return state;
  }
};

export default productReducer;
