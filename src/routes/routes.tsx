import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";

import { theme } from "../components/theme/Theme";
import Navbar from "../components/navbar/Navbar";
import Signin from "../components/signin/Signin";
import Register from "../components/register/Register";
import ProductHome from "../components/products/ProductHome";
import ProductDetails from "../components/products/ProductDetails";
import DashboardHome from "../components/dashboard/DashboardHome";
import DashboardUser from "../components/dashboard/DashboardUser";
import DashboardProduct from "../components/dashboard/DashboardProduct";
import ProductEdit from "../components/dashboard/ProductEdit";

const routes = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductHome} />
          <Route path="/products/:productId" component={ProductDetails} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={DashboardHome} />
          <Route exact path="/dashboard/user" component={DashboardUser} />
          <Route exact path="/dashboard/product" component={DashboardProduct} />
          <Route path="/dashboard/product/:productId" component={ProductEdit} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default routes;
