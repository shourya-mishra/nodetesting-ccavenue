import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,  HashRouter , Route, Switch, Redirect } from "react-router-dom";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";

import Index from "./views/Index.js";
import Blog from "./views/Blog.js";
import Blogs from "./views/Blogs.js";
import Products from "./views/Products.js";
import Warranty from "./views/Warranty.js";
import Enquiry from "./views/Enquiry.js";
import Contact from "./views/Contact.js";
import AboutUs from "./views/AboutUs.js";
import ProductView from "./views/ProductView.js";
import CustomizedLandingPage from "./views/CustomizedLandingPage.js";
import Rental from "./views/Rental.js";
import CheckoutPage from "./views/Checkout.js";
import CheckoutSuccessPage from "./views/CheckoutSuccess.js";
import RentalView from "./views/RentalView.js";
import CustomiseView from "./views/CustomiseView.js";
import Customise from "./views/Customise.js";
import Profile from "./views/Profile.js";
import Wishlist from "./views/Wishlist.js";
import ProductsCategory from "./views/ProductsCategory.js";

export default () => (
    <Router  basename={process.env.REACT_APP_BASENAME || ""}>
    <Switch>
      <Route exact path="/"  component={Index} exact />
      <Route exact path="/shopnow"  component={ProductsCategory} exact />
      <Route exact path="/wishlist"  component={Wishlist} exact />
      <Route exact path="/shopnow/:catName/:subName/:productName/:productId"  component={ProductView} exact />
      <Route exact path="/rental/:catName/:subName/:productName/:productId"  component={RentalView} exact />
      <Route exact path="/customised/:catName/:subName/:productName/:productId"  component={CustomiseView} exact />
      <Route exact path="/shopnow/:catName/:subName/"  component={ProductsCategory} exact />
      <Route exact path="/rental/:catName/:subName/"  component={Rental} exact />
      <Route exact path="/customised/:catName/:subName/"  component={Customise} exact />
      <Route exact path="/warranty"  component={Warranty} exact />
      <Route exact path="/enquiry"  component={Enquiry} exact />
      <Route exact path="/contact"  component={Contact} exact />
      <Route exact path="/blog"  component={Blog} exact />
      <Route exact path="/blogs"  component={Blogs} exact />
      <Route exact path="/rental"  component={Rental} exact />
      <Route exact path="/aboutus"  component={AboutUs} exact />
      <Route exact path="/checkout"  component={CheckoutPage} exact />
      <Route exact path="/checkoutsuccess"  component={CheckoutSuccessPage} exact />
      <Route exact path="/customised"  component={Customise} exact />
      <Route exact path="/profile"  component={Profile} exact />
      <div className="floatingIcon">
        <img src={require("../src/assets/img/products/floatingDots.png")} className="float" />
        <img src={require("../src/assets/img/products/floatingDots.png")} className="float" />
      </div>
    </Switch>  
  </Router>
  );