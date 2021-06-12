import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Drawer,
  Table,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Button,
} from "@material-ui/core";

import {
  cleanCart,
  deleteProductCart,
  toggleCart,
} from "../../redux/actions/cartActions";

import { Cart } from "../../redux/types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: "80vw",
      [theme.breakpoints.up("md")]: {
        width: "50vw",
      },
    },
    paper: {
      minHeight: "100vh",
    },
    table: {
      margin: "auto",
      [theme.breakpoints.up("md")]: {
        margin: "auto",
        width: "100%",
      },
    },
    tableTotal: {
      margin: "auto",
      [theme.breakpoints.up("md")]: {
        margin: "2rem auto",
        width: "50%",
      },
    },
    img: {
      height: "30px",
      width: "auto",
      margin: 0,
    },
    loading: {
      textAlign: "center",
      margin: "1rem auto",
    },
    btn: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      margin: "1rem auto",
      "&:hover": {
        border: "0.2rem #404040 solid",
        backgroundColor: theme.palette.primary.light,
      },
    },
    checkout: {
      textAlign: "center",
    },
  })
);

type Item = {
  qty: number;
  _id: string;
  product: {
    variant: {
      price: number;
    };
    _id: string;
    title: string;
    image: string;
  };
};

type State = {
  cart: {
    isOpen: boolean;
    userCart: Cart | string;
    errorGetCart: Error | null;
  };
};

const CartDrawer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isOpen, userCart } = useSelector((state: State) => state.cart);

  const totalArray: number[] = [];
  (userCart as Cart).items?.map((item: Item) =>
    totalArray.push(+item.qty * +item.product.variant.price)
  );

  const total = totalArray.length
    ? totalArray.reduce((acc, currentValue) => {
        return acc + currentValue;
      })
    : 0;

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(toggleCart(false))}
    >
      {userCart ? (
        <TableContainer component={Paper} className={classes.paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Qty.</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="center">Remove from cart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(userCart as Cart).items?.map((item: Item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">
                    <img
                      className={classes.img}
                      src={item.product.image}
                      alt="countrie-flag"
                    />
                  </TableCell>
                  <TableCell align="center">{item.product.title}</TableCell>
                  <TableCell align="center">{+item.qty}</TableCell>
                  <TableCell align="center">
                    ${+(+item.qty * +item.product.variant.price).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="show new countries"
                      color="inherit"
                      onClick={() => {
                        dispatch(deleteProductCart(item.product._id));
                        window.location.reload();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table className={classes.tableTotal} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Clean Cart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{+total.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      dispatch(cleanCart());
                      window.location.reload();
                    }}
                    className={classes.btn}
                  >
                    Clean Cart
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className={classes.checkout}>
            <Button className={classes.btn}>Proceed to checkout</Button>
          </div>
        </TableContainer>
      ) : (
        <div className={classes.loading}>There are no items in cart</div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
