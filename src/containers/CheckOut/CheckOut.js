import React, { Component } from "react";
import {Route} from 'react-router-dom';

import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {

  cancelOrder=()=>{
      this.props.history.replace('/build')
  }
  contOrder=()=>{
      this.props.history.push('/check-out/cotact-data')
  }

  render() {
    return (
      <div>
        <CheckOutSummary ingrediants={this.props.ingrediants} cancelOrder={this.cancelOrder} contOrder={this.contOrder} />
        <Route path={this.props.match.url+'/cotact-data'} component={ContactData}/>
      </div>
    ); 
  }
}


export default CheckOut;
