import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import { User } from "../../redux/types/types";
import { editUser, fetchAllUsers } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2),
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
    adminBox: {
      textAlign: "center",
    },
    adminLabel: {
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
    signUp: {
      textAlign: "center",
    },
    error: {
      color: "#fa1e0e",
      textAlign: "center",
    },
  })
);

type State = {
  user: {
    user: User | null;
    allUsers: User[];
    errorEditUser: Error | null;
  };
};

type FilteredUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const DashboardUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filteredUser, setFilteredUser] = useState<FilteredUser>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const { allUsers, errorEditUser } = useSelector((state: State) => state.user);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          First choose an user
        </Typography>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Enter a valid email.")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            const { email } = values;
            const filteredData = allUsers.filter(
              (user: User) => user.email === email
            );
            setFilteredUser(filteredData[0] as FilteredUser);
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid item xs={12} className={classes.adminBox}>
                <p className={classes.adminLabel}>Email</p>
                <Field
                  name="email"
                  component="select"
                  className={classes.select}
                >
                  <option>Choose one...</option>
                  {allUsers.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </Field>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Choose an user
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Edit User Information {filteredUser.firstName}
        </Typography>
        <Formik
          initialValues={{
            firstName: (filteredUser as FilteredUser).firstName,
            lastName: (filteredUser as FilteredUser).lastName,
            isAdmin: false,
            password: "",
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            firstName: Yup.string(),
            lastName: Yup.string(),
            isAdmin: Yup.boolean(),
            password: Yup.string()
              .min(6, "Password should be min 6 characters long.")
              .max(20, "Password is too long."),
          })}
          onSubmit={(data, { resetForm }) => {
            const { firstName, lastName, password, isAdmin } = data;
            dispatch(
              editUser(
                (filteredUser as FilteredUser)._id,
                firstName,
                lastName,
                (filteredUser as FilteredUser).email,
                password,
                isAdmin
              )
            );
            resetForm();
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
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12} className={classes.adminBox}>
                <p className={classes.adminLabel}>Is the person admin?</p>
                <Field
                  name="isAdmin"
                  component="select"
                  className={classes.select}
                >
                  <option>Choose one...</option>
                  <option value="false">false</option>
                  <option value="true">true</option>
                </Field>
              </Grid>
              {errorEditUser ? (
                <div className={classes.error}>{errorEditUser.message}</div>
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
                Edit user information
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default DashboardUser;
