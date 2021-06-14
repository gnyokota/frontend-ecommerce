import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography, Input } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import { createProduct } from "../../redux/actions/productActions";

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
      margin: "0.5rem 0 0.25rem",
      textAlign: "left",
    },
    select: {
      width: "100%",
      fontSize: "1rem",
      padding: "0.5rem 0.25rem",
      margin: ".2rem 0",
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
      margin: "0.5rem auto",
      width: "100%",
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
  countInStock: Yup.string()
    .min(0, "Stock cannot be negative.")
    .required("This field is required."),
  price: Yup.string()
    .min(0, "Price cannot be negative.")
    .required("This field is required."),
  color: Yup.string(),
  size: Yup.string(),
  image: Yup.string().required("This field is required."),
});

type State = {
  product: {
    errorCreateProduct: Error | null;
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
  image: string;
};

const initialValue: InitialValue = {
  title: "",
  description: "",
  category: "",
  countInStock: 0,
  price: 0,
  color: "",
  size: "",
  image: "",
};

const DashboardProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { errorCreateProduct } = useSelector((state: State) => state.product);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Add a new product
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const form = new FormData();
            form.append("image", values.image);
            form.append("title", values.title);
            form.append("description", values.description);
            form.append("category", values.category);
            form.append("countInStock", values.countInStock.toString());
            form.append("price", values.price.toString());
            form.append("color", values.color);
            form.append("size", values.size);
            dispatch(createProduct(form));
            resetForm();
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
                  label="Category"
                  name="category"
                  component="select"
                  className={classes.select}
                >
                  <option value="Appliances">Acessories</option>
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
              <Grid item xs={12} className={classes.input}>
                <Input
                  className={classes.input}
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "image",
                      (event.currentTarget as any).files[0]
                    );
                  }}
                />
              </Grid>
              {errorCreateProduct ? (
                <div className={classes.error}>
                  {errorCreateProduct.message}
                </div>
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
                Add new Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default DashboardProduct;
