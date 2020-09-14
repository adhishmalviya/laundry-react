import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import NavBar from "./components/NavBar";
import jwtDecode from "jwt-decode";
import NearByShops from "./components/mapNearbyStores";
import Pickup from "./components/Pickup";
import UpdateShop from "./components/UpdateShop";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Payment from "./components/Payment";
import Order from "./components/Orders";
import LoginForm from "./components/loginForm";
import RegisterUserForm from "./components/RegisterUserForm";
import RegisterShopForm from "./components/RegisterShopForm";
import Profile from "./components/profile";
export default class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const user = this.state.user;
    return (
      <div>
        <NavBar user={user} />
        <div className="content">
          <Switch>
          //just to check order routes are working or not
          <Route exact path="/order" component={Order} />
            <Route path="/" exact component={LandingPage} />
            <Route
              path="/nearby"
              component={() => <NearByShops user={user} />}
            />
            <Route path="/profile" component={Profile} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/registershop" component={RegisterShopForm} />
            <Route
              exact
              path="/registercustomer"
              component={RegisterUserForm}
            />
            <Route
              exact
              path="/pickups"
              component={() => <h1>In Development</h1>}
            />
            <Route exact path="/book" component={Pickup} />
            <Route exact path="/shops/{myid}" component={UpdateShop} />
            <Route exact path="/payment" component={Payment} />
          </Switch>
        </div>
      </div>
    );
  }
}
