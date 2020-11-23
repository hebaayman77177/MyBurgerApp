import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: {},
  loadingOrders: true,
};

//it is petther not to pass action values as objects

const initOrders = (state, action) => {
  console.log("reeeeeeeeeeeeeee");
  console.log(action.orders);
  return {
    ...state,
    orders: { ...action.orders },
    loadingOrders: false,
  };
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_ORDERS:
      return initOrders(state, action);
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders:{...state.orders.orders}
      }
  }
  return {
    ...state,
    orders: { ...state.orders.orders },
  };
};

export default reducer;
