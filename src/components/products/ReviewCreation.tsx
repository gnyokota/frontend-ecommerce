import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import { postReview } from "../../redux/actions/productActions";
import { User } from "../../redux/types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(1),
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
    ratingLabel: {
      color: "#b0b0b0",
    },
    select: {
      width: "25%",
      fontSize: "1rem",
      padding: "0.5rem 0.25rem",
      margin: "0.25rem",
    },
    submit: {
      boxShadow: "none",
      padding: "0.2rem 1rem",
      borderRadius: "0.5rem",
      border: "0.1rem #a4a4a4 solid",
      fontSize: "1rem",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      textTransform: "none",
      "&:hover": {
        border: "0.2rem #404040 solid",
        boxShadow: "none",
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
  comment: Yup.string()
    .max(200, "Max of 200 characters")
    .required("This field is required."),
  rating: Yup.number(),
});

type State = {
  user: {
    user: User | null;
  };
};

const ReviewCreation = ({ productId }: { productId: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state: State) => state.user);

  type InitialValue = {
    name: string;
    comment: string;
    rating: number;
  };

  const initialValue: InitialValue = {
    name: (user as User).firstName,
    comment: "",
    rating: 1,
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Add a review
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(postReview(productId, values));
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="comment"
                  label="Comment"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <p className={classes.ratingLabel}>Rating</p>
                <Field
                  name="rating"
                  component="select"
                  className={classes.select}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Field>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add a review
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default ReviewCreation;
