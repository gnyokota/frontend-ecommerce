import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Product, Review } from "./ProductHome";
import Rating from "./Rating";
import ReviewCreation from "./ReviewCreation";
import {
  deleteProduct,
  fecthProductDetails,
} from "../../redux/actions/productActions";

import "./styles/ProductDetails.scss";
import CartDrawer from "../cart/CartDrawer";
import { User } from "../../redux/types/types";
import { addCartQty, createCart } from "../../redux/actions/cartActions";

type State = {
  cart: {
    qty: number;

    errorCreateCart: Error | null;
  };
  product: {
    products: Product[];
    error: Error | null;
    productDetail: Product | string;
    errorDetail: Error | null;
    errorDeleteProduct: Error | null;
  };
  user: {
    user: User | null;
  };
};

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { productDetail, errorDeleteProduct } = useSelector(
    (state: State) => state.product
  );
  const { user } = useSelector((state: State) => state.user);

  const { qty, errorCreateCart } = useSelector((state: State) => state.cart);

  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    dispatch(fecthProductDetails(productId));
  }, [dispatch, productId]);

  return (productDetail as Product) ? (
    <div>
      {user?.isAdmin ? (
        <div>
          <Link
            to={`/dashboard/product/${productId}`}
            className="delete-edit-item"
          >
            <EditIcon />
            <p>Edit Item</p>
          </Link>
          <Link
            to="/dashboard"
            className="delete-edit-item"
            onClick={() => dispatch(deleteProduct(productId))}
          >
            <DeleteForeverIcon />
            <p>Delete Item</p>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="details row">
        {errorDeleteProduct ? (
          <div className="error">
            Product was not deleted: {errorDeleteProduct.message}
          </div>
        ) : (
          ""
        )}
        <div className="details__item col-1">
          <img
            className="details__img"
            src={`http://localhost:8080/${(productDetail as Product).image}`}
            alt={(productDetail as Product).title}
          />
        </div>
        <div className=" details__item col-1">
          <ul>
            <li>
              <h2>{(productDetail as Product).title}</h2>
            </li>
            <li>
              <Rating
                rating={(productDetail as Product).generalRating}
                reviews={(productDetail as Product).reviews.length}
              />
            </li>
            <li>Price: ${(productDetail as Product).variant.price}</li>
            <li className="details__subtitle">
              <p>Description: {(productDetail as Product).description}</p>
            </li>
            {(productDetail as Product).variant.color ? (
              <li className="details__subtitle">
                <p>Color: {(productDetail as Product).variant.color}</p>
              </li>
            ) : (
              ""
            )}
            {(productDetail as Product).variant.size ? (
              <li className="details__subtitle">
                <p>Size: {(productDetail as Product).variant.size}</p>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul>
            <li className="details__review__title">
              <h2>Product Reviews</h2>
            </li>
            {(productDetail as Product).reviews.length
              ? (productDetail as Product).reviews.map(
                  (rev: Review, index: number) => (
                    <div key={index}>
                      <li className="details__review__subtitle">
                        <h4>{rev.name}</h4>
                      </li>
                      <li className="details__review__subtitle">
                        <p>{rev.comment}</p>
                      </li>
                    </div>
                  )
                )
              : ""}
          </ul>
        </div>
        <div className="details__item col-1">
          <div className="details__box">
            <ul>
              <li>
                <div className="row">
                  <div className="details__box__label">Price</div>
                  <div className="details__box__price">
                    ${(productDetail as Product).variant.price}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="details__box__label">Status</div>
                  <div>
                    {(productDetail as Product).countInStock > 0 ? (
                      <span className="details__box__inStock">In stock</span>
                    ) : (
                      <span className="details__box__notInStock">
                        Currently unavailable
                      </span>
                    )}
                  </div>
                </div>
              </li>

              {(productDetail as Product).countInStock > 0 && user ? (
                <div>
                  <li>
                    <div className="row">
                      <div className="details__box__label">Qty</div>
                      <select
                        className="details__box__select"
                        value={qty}
                        onChange={(e) => dispatch(addCartQty(+e.target.value))}
                      >
                        {[
                          ...Array(
                            (productDetail as Product).countInStock
                          ).keys(),
                        ].map((qty, index) => (
                          <option key={index} value={qty + 1}>
                            {qty + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li>
                    <button
                      className="details__box__btn btn--primary btn--block"
                      onClick={() => {
                        dispatch(createCart(productId, qty));
                        window.location.reload();
                      }}
                    >
                      Add to Cart
                    </button>
                  </li>
                  {errorCreateCart ? (
                    <div className="error">
                      Product not added to cart: {errorCreateCart.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
          {user ? (
            <div className="details__box">
              <ReviewCreation productId={(productDetail as Product)._id} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <CartDrawer />
    </div>
  ) : (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default ProductDetails;
