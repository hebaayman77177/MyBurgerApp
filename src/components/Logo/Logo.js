import React from "react";

import burgerLogo from '../../assets/burger_logo.png';

import classes from "./Logo.module.css";

const logo = (props) =>{
    return <div className={classes.Logo}>
        <img src={burgerLogo} alt={"MyBurger"}/>
    </div>
}

export default logo;
