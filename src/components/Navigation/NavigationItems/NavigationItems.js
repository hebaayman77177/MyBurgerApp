import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = (props) =>{
    return <ul className={classes.NavigationItems}>
        <NavigationItem link={"#"} active>BurgerBuilder</NavigationItem>
        <NavigationItem link={"#"}>CheckOut</NavigationItem>
    </ul>;
}

export default navigationItems;
