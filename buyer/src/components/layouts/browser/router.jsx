import React, { lazy,Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from '../spinner/spinner';
import {connect }from 'react-redux'


import {PrivateRoute,AuthRoute} from '../../../router/privateAuthRoute';

/// Buyer

const Home = lazy(() => import("../../home/home"));

// Privacy

const Privacy = lazy(() => import("../../privacy/privacy"));

/// Seller

const Seller = lazy(() => import("../../seller/seller"));

const ProfileSeller = lazy(() => import("../../seller/profile/profile"));

/// Carousels

const Carousels = lazy(() => import("../../carousels/carousels.jsx"));

/// Seller

const Buyer = lazy(() => import("../../buyer/buyer"));

/// Category

const SubCategory = lazy(() => import("../../categories/Categories"));

const SubSubCategory = lazy(() => import("../../categories/subCategory"));

const ProductSubCategory = lazy(() => import("../../categories/productCategory"));

///Login

const Auth = lazy(() => import("../../login/auth"));

const Login = lazy(() => import("../../login/login"));

/// Page Not Found

const NotFound = lazy(() => import("../../notfound/notfound"));

///Register

const Register = lazy(() => import("../../register/register"));

///Active Account

const Active = lazy(() => import("../../activeAccount/active"));

///Active Account

const ResetPassword = lazy(() => import("../../forgetPassword/reset"));

const RenewPassword = lazy(() => import("../../forgetPassword/renew"));

/// Products

const Products = lazy(() => import("../../products/products"));

const showProduct = lazy(() => import("../../products/show"));

const Search = lazy(() => import("../../products/search"));

/// Cart

const Cart = lazy(() => import("../../cart/cart"));

const Router = (props) => {
  return (
    <Suspense fallback={<Spinner width="100%" height="100vh" />} >
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute {...props} path="/dashboard" component={Seller} />
      <Route {...props} exact path="/seller/:name" component={ProfileSeller} />
      <PrivateRoute {...props}  path="/profile" component={Buyer} />
      <AuthRoute exact path="/login" {...props} component={Auth} />
      <AuthRoute exact path="/login/:type" {...props} component={Login} />
      <AuthRoute exact path="/register/:type" {...props} component={Register} />
      <Route exact path="/active/:type/:token" component={Active} />
      <Route exact path="/carousel/:name" component={Carousels} />
      <Route exact path="/reset-password/:type" component={ResetPassword} />
      <Route exact path="/renew/:type/:token" component={RenewPassword} />
      <Route exact path="/category/:category" component={SubCategory} />
      <Route exact path="/category/:category/subcategory/:subcategory" component={SubSubCategory} />
      <Route exact path="/category/:category/subcategory/:subcategory/products" component={ProductSubCategory} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/search/:search" component={Search} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/product/:product" component={showProduct} />
      <Redirect to="/" />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
};

const mapStateToProps = s => s.authorization;

export default connect(mapStateToProps)(Router);
