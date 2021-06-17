import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import {
  editProduct,
  fecthProductDetails,
} from "../../redux/actions/productActions";
import { Product } from "../../redux/types/types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.light,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    field: {
      marginBottom: theme.spacing(1),
    },
    categoryBox: {
      textAlign: "center",
    },
    categoryLabel: {
      color: "#8a8a8a",
    },
    select: {
      width: "80%",
      fontSize: "1rem",
      padding: "0.5rem 0.25rem",
      margin: ".2rem 1rem",
    },
    submit: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(3, 0, 2),
      "&:hover": {
        border: "0.2rem #404040 solid",
        backgroundColor: theme.palette.primary.light,
      },
    },
    link: {
      textDecoration: "none",
    },
    input: {
      margin: "1rem auto",
      width: "90%",
      textAlign: "center",
    },
    signUp: {
      textAlign: "center",
    },
    error: {
      color: "#fa1e0e",
      textAlign: "center",
    },
  })
);

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Title is too long.")
    .required("This field is required."),
  description: Yup.string().required("This field is required."),
  category: Yup.string()
    .max(50, "Category is too long.")
    .required("This field is required."),
  countInStock: Yup.number()
    .min(0, "Stock cannot be negative.")
    .required("This field is required."),
  price: Yup.number()
    .min(0, "Price cannot be negative.")
    .required("This field is required."),
  color: Yup.string(),
  size: Yup.string(),
});

type State = {
  product: {
    productDetail: Product | string;
    errorEditProduct: Error | null;
  };
};

type InitialValue = {
  title: string;
  description: string;
  category: string;
  countInStock: number;
  price: number;
  color: string;
  size: string;
};

const ProductEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    dispatch(fecthProductDetails(productId));
  }, [dispatch, productId]);

  const { productDetail, errorEditProduct } = useSelector(
    (state: State) => state.product
  );

  const initialValue: InitialValue = {
    title: (productDetail as Product).title,
    description: (productDetail as Product).description,
    category: (productDetail as Product).category,
    countInStock: (productDetail as Product).countInStock,
    price: (productDetail as Product).variant.price,
    color: (productDetail as Product).variant.color,
    size: (productDetail as Product).variant.size,
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Edit the product
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const {
              title,
              description,
              category,
              countInStock,
              price,
              color,
              size,
            } = values;
            dispatch(
              editProduct(
                title,
                description,
                category,
                countInStock,
                price,
                color,
                size,
                productId
              )
            );
            window.location.assign("/");
          }}
        >
          {(formProps) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="title"
                  label="Title"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="countInStock"
                  label="Number in stock"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="color"
                  label="Color"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="size"
                  label="Size"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12} className={classes.categoryBox}>
                <p className={classes.categoryLabel}>Category</p>
                <Field
                  name="category"
                  component="select"
                  type="select"
                  className={classes.select}
                >
                  <option value="Appliances">Appliances</option>
                  <option value="Beauty & Personal Care">
                    Beauty & Personal Care
                  </option>
                  <option value="Computers">Computers</option>
                  <option value="Clothing, Shoes and Jewelry">
                    Clothing, Shoes and Jewelry
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Office Products">Office Products</option>
                  <option value="Movies & TV">Movies & TV</option>
                </Field>
              </Grid>
              {errorEditProduct ? (
                <div className={classes.error}>{errorEditProduct.message}</div>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit product information
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default ProductEdit;
