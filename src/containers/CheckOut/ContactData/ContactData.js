import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Button/Button"
import axios from "../../../axios-orders"

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
      country:"Egypt"
    },
    loading: false,
    deliveryMethod:"fastest"
  };
  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingrediants,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country:this.state.address.country
        },
        email: this.state.email,
      },
      deliveryMethod: this.state.deliveryMethod,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch((error) => {
          console.log(error)
        this.setState({ loading: false });
      });
      this.props.history.push('/build')
  };
  render = () => {
      let contactData = (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your mail" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </div>
      )
      if(this.state.loading){
        contactData = <Spinner/>
      }
    return contactData;
  };
}

export default ContactData;
