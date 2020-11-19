import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingrediants:</p>
      <ul>{ingredientSummary}</ul>
      <p>Price: {props.totalPrice.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button btnType={"Success"} clicked={props.contPurch}>
        {" "}
        Continue{" "}
      </Button>
      <Button btnType={"Danger"} clicked={props.cancelPurch}>
        {" "}
        Cancel{" "}
      </Button>
    </Aux>
  );
};



export default orderSummary;
