import React from "react";

import classes from "./Order.module.css";

const order = (props) => {
  const ingrediants = Object.keys(props.ingredients).map((ingredKey) => {
    return (
      <li key={ingredKey}>
        {" "}
        {ingredKey}: {props.ingredients[ingredKey]}
      </li>
    );
  });
  return (
    <div className={classes.Order}>
      <h3>customer</h3>
      <ul>
        <li>name: {props.customer.name}</li>
        <li>
          address: {props.customer.address.country},{" "}
          {props.customer.address.street}, {props.customer.address.zipCode}
        </li>
        <li>email: {props.customer.email}</li>
      </ul>
      <h4>Price: {props.price} LE</h4>
      <h4> Delivery Method: {props.deliveryMethod}</h4>
      <h4>Ingredients</h4>
      <ul>
      {ingrediants}
      </ul>
    </div>
  );
};

export default order;
