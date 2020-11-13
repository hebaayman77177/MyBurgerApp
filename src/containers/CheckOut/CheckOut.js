import React, { Component } from "react";
import {Route} from 'react-router-dom';

import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingrediants: {
      meat: 1,
      cheese: 1,
      bacon: 1,
      salad: 0,
    },
  };
  componentDidMount(){
      let params = new URLSearchParams(this.props.location.search);
        let ingrediants = {}
        let price = 0
      for (const [key, value] of params) {
          if(key==='price'){
              price= +value
              continue
          }
          ingrediants[key]=value*1
      }
      this.setState({ingrediants:ingrediants,totalPrice:price})
  }
  cancelOrder=()=>{
      this.props.history.replace('/build')
  }
  contOrder=()=>{
      this.props.history.push('/check-out/cotact-data')
  }

  render() {
    return (
      <div>
        <CheckOutSummary ingrediants={this.state.ingrediants} cancelOrder={this.cancelOrder} contOrder={this.contOrder} />
        <Route path={this.props.match.url+'/cotact-data'} render={(props)=>(<ContactData ingrediants={this.state.ingrediants} totalPrice={this.state.totalPrice} {...props}/>)}/>
      </div>
    ); 
  }
}

export default CheckOut;
