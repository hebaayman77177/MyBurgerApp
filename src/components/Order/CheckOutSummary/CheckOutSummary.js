import React,{Component} from "react";
import { connect } from "react-redux";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckOutSummary.module.css"

class CheckOutSummary extends Component{

  render(){
    return (
      <div className={classes.CheckoutSummary}>
        <h1>Hope test well :)</h1>
        <div style={{width:"100%",margin:"auto"}}>
          <Burger ingrediants={this.props.ingrediants} />
        </div>
        <Button btnType="Danger"clicked={this.props.cancelOrder}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.contOrder}>Continue</Button>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    ingrediants: state.burger.ingrediants,
  };
};


export default connect(mapStateToProps)(CheckOutSummary);

