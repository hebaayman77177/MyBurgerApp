import React from "react";
import ReactDOM from "react-dom";
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import OrdersReducer from './store/reducers/order'


const rootReducer = combineReducers({
  burger:burgerBuilderReducer,
  orders:OrdersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
