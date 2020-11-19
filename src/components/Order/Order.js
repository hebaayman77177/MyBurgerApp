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
        <li>name: {props.order.name}</li>
        <li>
          address: {props.order.country},{" "}
          {props.order.street}, {props.order.zipCode}
        </li>
        <li>email: {props.order.email}</li>
      </ul>
      <h4>Price: {props.price} LE</h4>
      <h4> Delivery Method: {props.order.deliveryMethod}</h4>
      <h4>Ingredients</h4>
      <ul>
      {ingrediants}
      </ul>
    </div>
  );
};

export default order;
