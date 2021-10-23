import React, { lazy,Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from '../spinner/spinner';


const Orders = lazy(() => import("../../orders/orders"));
const Message = lazy(() => import("../../message/message"));
const Meeting = lazy(() => import("../../meeting/meeting"));
const WishList = lazy(() => import("../../wishlist/wishlist"));
const Negotiate = lazy(() => import("../../negotiate/negotiate")); 
const Invoice = lazy(() => import("../../invoice/invoice")); 
const Settings = lazy(() => import("../../settings/info"));
const Password = lazy(() => import("../../settings/settings"));

const Router = (props) => {
    return (
      <Suspense fallback={<Spinner width="100%" height="100vh" />}>
      <Switch>
        <Route exact path="/profile" component={Orders} />
        <Route exact path="/profile/orders" component={Orders} />
        <Route exact path="/profile/message" component={Message} />
        <Route exact path="/profile/meeting" component={Meeting} />
        <Route exact path="/profile/negotiate" component={Negotiate} />
        <Route exact path="/profile/wishlist" component={WishList} />
        <Route exact path="/profile/settings" component={Settings} />
        <Route exact path="/profile/password" component={Password} />
        <Route exact path="/profile/invoice/:id" component={Invoice} />
      </Switch>
      </Suspense>
    );
  };
  
  export default Router;
  