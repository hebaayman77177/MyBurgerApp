import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          rules: { required: true, minLength: 5, maxLength: 10 },
          isValid: false,
        },
        isTouched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          rules: {},
          isValid: true,
        },
        isTouched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          rules: { required: true },
          isValid: false,
        },
        isTouched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code",
        },
        value: "",
        validation: {
          rules: { required: true },
          isValid: false,
        },
        isTouched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          rules: { required: true },
          isValid: false,
        },
        isTouched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          placeholder: "Delivery method",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          rules: { required: false },
          isValid: true,
        },
        isTouched: true,
      },
    },
    loading: false,
    isFormValid: false,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid &= value.trim() !== "";
    }
    if (rules.minLength) {
      isValid &= value.length >= rules.minLength;
    }
    if (rules.maxLength) {
      isValid &= value.length <= rules.maxLength;
    }
    return isValid;
  }
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const inputName in this.state.orderForm) {
      formData[inputName] = this.state.orderForm[inputName].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingrediants,
      price: this.props.totalPrice,
      order: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
    this.props.history.push("/build");
  };
  onChangeInputHandler(event, inputIdentifier) {
    const toUpdateOrderForm = { ...this.state.orderForm };
    const toUpdateInputElement = { ...toUpdateOrderForm[inputIdentifier] };
    toUpdateInputElement.value = event.target.value;
    toUpdateInputElement.validation.isValid = this.checkValidity(
      event.target.value,
      this.state.orderForm[inputIdentifier].validation.rules
    );
    toUpdateInputElement.isTouched = true;
    toUpdateOrderForm[inputIdentifier] = toUpdateInputElement;
    let isFormValid = false;
    if (toUpdateInputElement.validation.isValid&this.state.orderForm[inputIdentifier].isTouched) {
      isFormValid = Object.keys(this.state.orderForm).reduce(
        (acc, inputKey) => {
          return acc & this.state.orderForm[inputKey].validation.isValid&this.state.orderForm[inputKey].isTouched;
        },
        true
      );
    }
    // console.log("888888888888888888888888888888888888888",isFormValid)
    this.setState({ orderForm: toUpdateOrderForm, isFormValid: isFormValid });
  }
  render = () => {
    const formInputs = Object.keys(this.state.orderForm).map((inputKey) => {
      let input = this.state.orderForm[inputKey];
      return (
        <Input
          key={inputKey}
          elementType={input.elementType}
          elementConfig={input.elementConfig}
          value={input.value}
          changed={(event) => this.onChangeInputHandler(event, inputKey)}
          isValid={input.validation.isValid}
          isTouched={input.isTouched}
        />
      );
    });
    let contactData = (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {formInputs}
        <Button
          disabled={!this.state.isFormValid}
          btnType="Success"
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </div>
    );
    if (this.state.loading) {
      contactData = <Spinner />;
    }
    return contactData;
  };
}


const mapStateToProps = (state) => {
  return {
    ingrediants: state.ingrediants,
    totalPrice: state.totalPrice
  };
};


export default connect(mapStateToProps)(ContactData);
