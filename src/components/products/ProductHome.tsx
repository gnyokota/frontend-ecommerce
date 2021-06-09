import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import CartDrawer from "../cart/CartDrawer";
import { CircularProgress } from "@material-ui/core";

import { fecthProducts } from "../../redux/actions/productActions";
import { getCart } from "../../redux/actions/cartActions";

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
    color?: string;
    size?: string;
  };
  image: string;
  generalRating: number;
  reviews: Review[];
};

type State = {
  product: {
    filteredProducts: Product[];
    error: Error | null;
  };
};

const ProductHome = () => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state: State) => state.product);

  useEffect(() => {
    dispatch(fecthProducts());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <div className="row row--center">
        {filteredProducts.length ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
      <CartDrawer />
    </div>
  );
};

export default ProductHome;
