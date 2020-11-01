import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const toolbar = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.toggelSideDrawer}/>
      <div
        className={classes.SideDrawer}
        style={{ display: props.show ? "block" : "none" }}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default toolbar;
