import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDrawerToggler from "../SideDrawer/SideDrawerToggler/SideDrawerToggler";

import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <SideDrawerToggler clicked={props.toggelSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};
export default toolbar;
