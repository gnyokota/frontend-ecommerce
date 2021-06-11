import { Link } from "react-router-dom";

import Rating from "./Rating";
import { Product } from "./ProductHome";

import "./styles/ProductCard.scss";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card">
      <Link to={`/products/${product._id}`}>
        <img
          className="card__img"
          src={`https://ecommerce-pantanal.herokuapp.com/${product.image}`}
          alt={product.title}
        />
      </Link>
      <div className="card__body">
        <Link to={`/products/${product._id}`}>
          <h2>{product.title}</h2>
        </Link>
        <Rating
          reviews={product.reviews.length}
          rating={product.generalRating}
        />
        <div className="card__body__price">
          <h1>${product.variant.price}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
