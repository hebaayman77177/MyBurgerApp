import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  state = {
    orders: {},
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        this.setState({ orders: response.data, loading: false });
      })
      .catch((error) => {});
  }

  render() {
    let orders = Object.keys(this.state.orders).map((orderKey) => {
      return (
        <Order
          key={orderKey}
          order={this.state.orders[orderKey].order}
          ingredients={this.state.orders[orderKey].ingredients}
          price={this.state.orders[orderKey].price}
        />
      );
    });
    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
