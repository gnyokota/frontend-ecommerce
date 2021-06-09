import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Avatar, Grid, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { Link } from "react-router-dom";

import { User } from "../../redux/types/types";
import { signin } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    field: {
      marginBottom: theme.spacing(1),
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
    signUp: {
      textAlign: "center",
    },
    error: {
      color: "red",
      margin: "1rem auto",
      textAlign: "center",
    },
  })
);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password should be min 6 characters long.")
    .max(50, "Password is too Long!")
    .required("This field is required."),

  email: Yup.string()
    .email("Enter a valid email.")
    .required("This field is required."),
});

type InitialValue = {
  email: string;
  password: string;
};

const initialValue: InitialValue = {
  email: "",
  password: "",
};

type State = {
  user: {
    user: User | null;
    errorSignin: Error | null;
  };
};

const Signin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, errorSignin } = useSelector((state: State) => state.user);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const { email, password } = values;
            dispatch(signin(email, password));
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  label="email"
                  type="email"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="password"
                  label="password"
                  type="password"
                  fullWidth
                  className={classes.field}
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>

              {errorSignin !== null ? (
                <Grid item className={classes.error}>
                  Wrong email or password
                </Grid>
              ) : (
                ""
              )}
              <Grid className={classes.signUp}>
                <Link to="/register" className={classes.link}>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Signin;
