import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderCreators from "../../store/actions/order";

class Orders extends Component {
  state = {};

  componentDidMount() {
    this.props.initOrders();
  }

  render() {
    let orders = <h3>There is no Orders yet</h3>;
    if (this.props.loadingOrders) {
      orders = <Spinner />;
    }
    if (Object.keys(this.props.orders).length !== 0) {
      orders = Object.keys(this.props.orders).map((orderKey) => {
        return (
          <Order
            key={orderKey}
            order={this.props.orders[orderKey].order}
            ingredients={this.props.orders[orderKey].ingredients}
            price={this.props.orders[orderKey].price}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loadingOrders: state.orders.loadingOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initOrders: () => dispatch(orderCreators.initOrders()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
