import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = (props) =>{
    return <ul className={classes.NavigationItems}>
        <NavigationItem link={"/build"} exact>BurgerBuilder</NavigationItem>
        <NavigationItem link={"/check-out"} exact>CheckOut</NavigationItem>
        <NavigationItem link={"/orders"} exact>Orders</NavigationItem>
    </ul>;
}

export default navigationItems;
