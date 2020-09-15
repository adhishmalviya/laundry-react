import React, { Component } from "react";
import MediaCard from "./shopComponent";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import axios from "axios";
import jwtDecode from "jwt-decode";
class LaundryShops extends Component {
  state = {
    nearByShops: [],
    user: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://laundrybackend.herokuapp.com/user/nearbyshops?lat=17.4448&lng=78.3498`
      )
      .then((res) => {
        const nearByShops = res.data;
        // const nearByShops = [1, 2, 3, 4, 5, 6, 7];

        this.setState({ nearByShops });
      })
      .catch((e) => {
        // console.log(e);
        // this.setState({ nearByShops: ["a", "b"] });
      });
    try {
      const jwt_decode = jwtDecode(localStorage.getItem("token"));
      this.setState({ nearByShops: this.state.nearByShops, user: true });
    } catch (e) {
      this.setState({ nearByShops: this.state.nearByShops, user: false });
    }
  }
  render() {
    return (
      <div>
        <div>
          <GridList
            cellHeight={400}
            style={{
              width: 665,
              height: 550,
            }}
            cols={3} /*container spacing={4}*/
          >
            {this.state.nearByShops.map((shop, index) => (
              <GridListTile /*item xs={12} sm={6} md={4}*/>
                <MediaCard
                  name={shop.name}
                  email={shop.email}
                  phoneNumber={shop.phoneNumber}
                  image={
                    "https://laundrybackend.herokuapp.com/uploads/" +
                    shop.imagename
                  }
                  address={shop.address}
                  openingTime={shop.OpeningTime}
                  closingTime={shop.ClosingTime}
                  price={shop.price}
                  user={this.state.user}
                />
                {/* <h1>{shop}</h1> */}
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default LaundryShops;
