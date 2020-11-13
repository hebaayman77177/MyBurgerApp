import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckOutSummary.module.css"

const checkOutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope test well :)</h1>
      <div style={{width:"100%",margin:"auto"}}>
        <Burger ingrediants={props.ingrediants} />
      </div>
      <Button btnType="Danger"clicked={props.cancelOrder}>Cancel</Button>
      <Button btnType="Success" clicked={props.contOrder}>Continue</Button>
    </div>
  );
};

export default checkOutSummary;
