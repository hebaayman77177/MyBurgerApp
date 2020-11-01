import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            add={() => props.addIngredient(ctrl.type)}
            remove={() => props.removeIngredient(ctrl.type)}
            disabled={props.diableInfo[ctrl.type]}
          />
        );
      })}
      <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
