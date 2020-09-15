import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

class PickupUser extends Component {
  constructor() {
    super();
    this.state = {
      shopemail: "",
      username: "",
      useremail: "",
      slot: "",
      quantity: null,
      shopname: "",
      SuperPrice: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.props);

    // console.log(this.props);
  }
  onSubmit(e) {
    e.preventDefault();
    const order = {
      storename: this.state.shopname,
      shopemail: this.state.shopemail,
      useremail: this.state.useremail,
      username: this.state.username,
      quantity: this.state.quantity,
      slot: this.state.slot,
    };
    axios
      .post("https://laundrybackend.herokuapp.com/book/add", order)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    this.props.history.push({
      pathname: "/payment",
      state: {
        price: this.state.SuperPrice * this.state.quantity,
        storename: this.state.shopname,
        shopemail: this.state.shopemail,
        useremail: this.state.useremail,
        username: this.state.username,
        quantity: this.state.quantity,
        slot: this.state.slot,
      },
    });
  }
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      // console.log(user);
      const useremail = "useremail";
      this.setState({ [useremail]: user.email, username: user.name });
    } catch (ex) {}

    if (this.props.location.shopemail) {
      this.setState({ shopemail: this.props.location.shopemail });
    }
    if (this.props.location.shopname) {
      this.setState({ shopname: this.props.location.shopname });
    }

    let SuperPrice = 1;
    if (this.props.location.price) SuperPrice = this.props.location.price;
    else SuperPrice = this.props.location.search.slice(1);
    this.setState({ SuperPrice });
    console.log(SuperPrice);
  }
  render() {
    return (
      <div className="container">
        <h1 className="pickhead">Book a Pickup</h1>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate className="pickform" onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal price">
                Price/Cloth is {this.state.SuperPrice}
              </h1>
              <div className="form-group">
                <label htmlFor="slot" className="font-weight-bold">
                  Choose you Pickup Slot
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="slot"
                  placeholder="9am-10pm"
                  value={this.state.slot}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity" className="font-weight-bold">
                  Specify number of Clothes, Price/Cloth is{" "}
                  {this.state.SuperPrice * this.state.quantity}
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="In number"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PickupUser;
