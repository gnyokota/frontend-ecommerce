import { Dispatch } from "redux";
import axios from "axios";

import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_ERROR,
  FILTER_PRODUCT,
  HANDLE_SEARCH_PRODUCT,
  AllProductActions,
  Product,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  EDIT_PRODUCT_ERROR,
} from "../types/types";

export const fetchProductsSuccess = (
  products: Product[]
): AllProductActions => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsError = (error: Error | null): AllProductActions => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
  };
};

export const fetchProductDetailsSuccess = (
  product: Product
): AllProductActions => {
  return {
    type: FETCH_PRODUCT_DETAILS_SUCCESS,
    payload: product,
  };
};

export const fetchProductDetailsError = (
  error: Error | null
): AllProductActions => {
  return {
    type: FETCH_PRODUCT_DETAILS_ERROR,
    payload: error,
  };
};

export const filterProduct = (products: Product[]) => {
  return {
    type: FILTER_PRODUCT,
    payload: products,
  };
};

export const handleSearchProduct = (searchField: string): AllProductActions => {
  return {
    type: HANDLE_SEARCH_PRODUCT,
    payload: searchField,
  };
};

export const createProductError = (error: Error | null): AllProductActions => {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: error,
  };
};

export const editProductError = (error: Error | null): AllProductActions => {
  return {
    type: EDIT_PRODUCT_ERROR,
    payload: error,
  };
};

export const deleteProductError = (error: Error | null): AllProductActions => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: error,
  };
};

export const fecthProducts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(
      "https://ecommerce-pantanal.herokuapp.com/api/v1/products"
    );
    dispatch(fetchProductsSuccess(data));
    dispatch(filterProduct(data));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};

export const fecthProductDetails =
  (productId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/products/${productId}`
      );
      dispatch(fetchProductDetailsSuccess(data));
    } catch (error) {
      dispatch(fetchProductDetailsError(error));
    }
  };

export const createProduct = (form: FormData) => (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const token = temp.token;
    axios.post(
      "https://ecommerce-pantanal.herokuapp.com/api/v1/products/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    dispatch(createProductError(error));
  }
};

export const editProduct =
  (
    title: string,
    description: string,
    category: string,
    countInStock: number,
    price: number,
    color: string,
    size: string,
    productId: string
  ) =>
  (dispatch: Dispatch) => {
    try {
      const temp = JSON.parse(localStorage.getItem("userInfo") as string);
      const token = temp.token;

      axios.put(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/products/${productId}`,
        { title, description, category, countInStock, price, color, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      dispatch(editProductError(error));
    }
  };

export const deleteProduct = (productId: string) => (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const token = temp.token;

    axios.delete(
      `https://ecommerce-pantanal.herokuapp.com/api/v1/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch(deleteProductError(error));
  }
};

type ReviewInput = {
  name: string;
  comment: string;
  rating: number;
};

export const postReview =
  (productId: string, review: ReviewInput) => async (dispatch: Dispatch) => {
    const { name, comment, rating } = review;
    try {
      axios.put(
        `https://ecommerce-pantanal.herokuapp.com/api/v1/products/review/${productId}`,
        {
          name: name,
          comment: comment,
          rating: +rating,
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };
