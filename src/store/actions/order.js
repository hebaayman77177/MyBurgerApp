import axios from "../../axios-orders";
import {INIT_ORDERS,ADD_ORDER} from './actionTypes';

const initOrderSync = (orders=null) => {
  return {
    type: INIT_ORDERS,
    orders: orders,
  };
};

export const initOrders = () => {
  return (dispatch) => {
    axios
      .get("/orders.json")
      .then((response) => {
        dispatch(initOrderSync(response.data))
      })
      .catch((error) => {
        throw error;
      });
  };
};


const addOrderSync = () => {
  return {
    type: ADD_ORDER,
  };
};

export const addOrder = (order) => {
  return (dispatch) => {
    axios
    .post("/orders", order)
    .then((response) => {
      dispatch(addOrderSync())

    })
    .catch((error) => {
    });
  };
};



