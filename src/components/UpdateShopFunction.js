import axios from "axios";

export const ShopUpdate = (newUser) => {
  return axios
    .post("https://laundrybackend.herokuapp.com/shops/{myid}", {
      OpeningTime: newUser.OpeningTime,
      ClosingTime: newUser.ClosingTime,
    })
    .then((response) => {
      console.log("Shop details has been updated");
    });
};

export const getProfile = (user) => {
  return axios
    .get("localhost:3000/shops/profile", {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
