import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";

import { User } from "../../redux/types/types";
import { register } from "../../redux/actions/userActions";

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
  })
);

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required."),
  lastName: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("This field is required."),
  password: Yup.string()
    .min(6, "Password should be min 6 characters long.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

type InitialValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialValue: InitialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

type State = {
  user: {
    user: User | null;
    errorRegister: Error | null;
  };
};

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state: State) => state.user);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Register
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const { firstName, lastName, email, password } = values;
            dispatch(register(firstName, lastName, email, password));
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
