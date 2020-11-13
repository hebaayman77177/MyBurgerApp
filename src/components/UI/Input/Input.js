import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  let inValidOrNullClass = null;
  if (!props.isValid && props.isTouched) {
    inValidOrNullClass = classes.Invalid;
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement + " " + inValidOrNullClass}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement + " " + inValidOrNullClass}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      const options = props.elementConfig.options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.displayValue}
          </option>
        );
      });
      inputElement = (
        <select
          className={classes.InputElement + " " + inValidOrNullClass}
          onChange={props.changed}
        >
          {options}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement + " " + inValidOrNullClass}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.elementConfig.placeholder}</label>
      {inputElement}
    </div>
  );
};

export default input;
