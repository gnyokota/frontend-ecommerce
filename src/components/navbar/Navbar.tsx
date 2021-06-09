import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

import {
  deleteCart,
  getCart,
  toggleCart,
} from "../../redux/actions/cartActions";

import { Cart, User } from "../../redux/types/types";
import { signout } from "../../redux/actions/userActions";
import { handleSearchProduct } from "../../redux/actions/productActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    navbar: {
      padding: "0 0.25rem",
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 2),
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: theme.palette.primary.light,
      fontFamily: "Helvetica, Arial, sans-serif",
      margin: "0 0.5rem",
      fontSize: "20px",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "#393e46",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "40vw",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      color: theme.palette.primary.contrastText,
    },
    iconMobile: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      textDecoration: "none",
      color: theme.palette.primary.dark,
    },
    username: {
      display: "flex",
      alignItems: "center",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },
  })
);

export type Item = {
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
  user: {
    user: User | null;
  };
  cart: {
    userCart: Cart | string;
  };
};

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { user } = useSelector((state: State) => state.user);
  const { userCart } = useSelector((state: State) => state.cart);

  var totalQty = !(userCart as Cart).items
    ? 0
    : (userCart as Cart).items.reduce(
        (accum, item) => accum + (item.qty as number),
        0
      );

  const handleCart = () => {
    dispatch(toggleCart(true));
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu =
    location.pathname === "/" || location.pathname.includes("/products") ? (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => dispatch(toggleCart(true))}>
          <IconButton aria-label="User cart" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        {user ? (
          <div>
            {user.isAdmin ? (
              <MenuItem>
                <Link to="/dashboard" className={classes.iconMobile}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                  <p className={classes.iconMobile}>Edit</p>
                </Link>
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem>
              <Link to="/" className={classes.iconMobile}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  color="inherit"
                  onClick={() => dispatch(signout())}
                >
                  <ExitToAppIcon />
                </IconButton>
                <p className={classes.iconMobile}>Logout</p>
              </Link>
            </MenuItem>
          </div>
        ) : (
          <MenuItem>
            <Link to="/signin" className={classes.iconMobile}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p className={classes.iconMobile}>Sign in</p>
            </Link>
          </MenuItem>
        )}
      </Menu>
    ) : (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => dispatch(toggleCart(true))}>
          <IconButton aria-label="User cart" color="inherit">
            <Badge badgeContent={+totalQty} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Menu>
    );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Link to="/" className={classes.link}>
            <Typography className={classes.title} variant="h4" noWrap>
              Pantanal
            </Typography>
          </Link>
          {location.pathname === "/" ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => dispatch(handleSearchProduct(e.target.value))}
              />
            </div>
          ) : (
            ""
          )}
          <div className={classes.grow} />
          {location.pathname === "/" ||
          location.pathname.includes("/products") ? (
            <div className={classes.sectionDesktop}>
              {user ? (
                <div className={classes.sectionDesktop}>
                  <IconButton
                    aria-label="user cart"
                    color="inherit"
                    onClick={handleCart}
                  >
                    <Badge badgeContent={+totalQty} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>

                  <div className={classes.username}>
                    <div className={classes.username}>
                      Hello, {(user as User).firstName}
                    </div>
                    {user.isAdmin ? (
                      <Link to="/dashboard" className={classes.link}>
                        <IconButton
                          edge="end"
                          aria-label="account of current user"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Link>
                    ) : (
                      ""
                    )}
                    <Link to="/" className={classes.link}>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                          dispatch(deleteCart());
                          dispatch(signout());
                        }}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to="/signin" className={classes.link}>
                  <IconButton
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
              )}
            </div>
          ) : (
            ""
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default Navbar;
