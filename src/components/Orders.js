import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import MaterialTable from "material-table";
export default class PersonList extends React.Component {
  state = {
    orders: [],
    isShop: false,
    isUser: false,
    columns: [],
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      if (user.isShop) {
        axios
          .get(
            `https://laundrybackend.herokuapp.com/book?shopemail=${user.email}`
          )
          .then((res) => {
            const orders = res.data;
            this.setState({
              orders,
              isShop: true,
              columns: [
                { title: "Name", field: "username" },
                { title: "Email", field: "useremail" },
                {
                  title: "Number of Clothes",
                  field: "quantity",
                  type: "numeric",
                },
                {
                  title: "Slot Booked",
                  field: "slot",
                },
              ],
            });
          });
      } else if (user.isUser) {
        axios
          .get(
            `https://laundrybackend.herokuapp.com/book/user?useremail=${user.email}`
          )
          .then((res) => {
            const orders = res.data;
            console.log(res.data);
            this.setState({
              orders,
              isUser: true,
              columns: [
                { title: "Shop Name", field: "shopname" },
                { title: "Email", field: "shopemail" },
                {
                  title: "Number of Clothes",
                  field: "quantity",
                  type: "numeric",
                },
                {
                  title: "Slot Booked",
                  field: "slot",
                },
              ],
            });
          });
      }
    } catch (ex) {}
  }

  render() {
    return (
      <MaterialTable
        title="Your Orders"
        columns={this.state.columns}
        data={this.state.orders}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    );
  }
}
