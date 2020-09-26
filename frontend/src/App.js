import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";

import ProductDetail from "./ProductDetail";
import Register from "./Register";
import PlaceOrder from "./PlaceOrder";
import Orders from "./Orders";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Profile from "./Profile";
import Order from "./Order";
import ProductCreate from "./ProductCreate";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact={true}
            path="/cart"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Cart {...props} />
              </Fragment>
            )}
          />
          <Route
            exact={true}
            path="/orders"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Orders {...props} />
              </Fragment>
            )}
          />

          <Route
            path="/products/:id"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <ProductDetail {...props} />
              </Fragment>
            )}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Profile {...props} />
              </Fragment>
            )}
          />
          <Route path="/signin" render={(props) => <Login {...props} />} />
          <Route path="/shipping" render={(props) => <Shipping {...props} />} />
          <Route path="/payment" render={(props) => <Payment {...props} />} />
          <Route
            path="/placeorder"
            render={(props) => <PlaceOrder {...props} />}
          />
          <Route
            path="/category/:id"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Home {...props} />
              </Fragment>
            )}
          />
          <Route path="/order/:id" render={(props) => <Order {...props} />} />
          <Route
            exact={true}
            path="/cart/:id?"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Cart {...props} />
              </Fragment>
            )}
          />
          <Route
            exact={true}
            path="/products"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <ProductCreate {...props} />
              </Fragment>
            )}
          />
          <Route exact={true} path="/products/:id" component={ProductDetail} />
          <Route
            exact={true}
            path="/login"
            render={(props) => (
              <Fragment>
                <Login {...props} />
              </Fragment>
            )}
          />
          <Route
            exact={true}
            path="/register"
            render={(props) => (
              <Fragment>
                <Register {...props} />
              </Fragment>
            )}
          />

          <Route
            exact={true}
            path="/"
            render={(props) => (
              <Fragment>
                <Header {...props} />
                <Home {...props} />
              </Fragment>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
