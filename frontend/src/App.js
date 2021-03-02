import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Cart from "./components/cart";
import Home from "./sub-component/home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProductScreen from "./components/productscreen";
import LogIn from "./components/logIn";
import Register from "./components/register";
import Profile from "./components/profile";
import Shipping from "./components/shipping";
import Payment from "./components/payment";
import PlaceOrder from "./components/placeOrder";
import OrderDetails from "./components/orderDetails";
import UserList from "./components/userListScreen";
import AdminUserUpdate from "./components/adminUserUpdate";
import ProductList from "./components/productListScreen";
import AdminProductUpdate from "./components/adminProductUpdate";
import OrderList from "./components/orderListScreen";
import About from "./components/about";
import ContactUs from "./components/contactUs";
import ShopBot from "./components/shopbot";
import NotFound from "./components/default";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <main>
          <Route path="/allorderlist" component={ProductList}></Route>
          <Switch>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/shipping" component={Shipping}></Route>
            <Route path="/payment" component={Payment}></Route>
            <Route path="/placeorder" component={PlaceOrder}></Route>
            <Route path="/login" component={LogIn}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/cart/:id?" component={Cart} exact></Route>
            <Route path="/order/:id?" component={OrderDetails}></Route>
            <Route path="/admin/userlist" component={UserList}></Route>
            <Route
              path="/admin/productlist"
              component={ProductList}
              exact
            ></Route>
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductList}
              exact
            ></Route>
            <Route
              path="/admin/user/:id/edit"
              component={AdminUserUpdate}
              exact
            ></Route>
            <Route
              path="/admin/product/:id/edit"
              component={AdminProductUpdate}
              exact
            ></Route>
            <Route path="/admin/orderlist" component={OrderList}></Route>
            <Route path="/search/:keyword" component={Home} exact></Route>
            <Route path="/page/:pageNumber" component={Home} exact></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/help" component={ShopBot}></Route>
            <Route path="/contactus" component={ContactUs}></Route>

            <Route
              path="/search/:keyword/page/:pageNumber"
              component={Home}
            ></Route>

            <Route path="/" component={Home} exact></Route>
            <Route path="/notfound" component={NotFound}></Route>
            <Redirect to="/notfound"></Redirect>
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
