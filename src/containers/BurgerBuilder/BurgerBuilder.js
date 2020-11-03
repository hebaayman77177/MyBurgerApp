import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.4,
};
class BurgerBuilder extends Component {
  state = {
    ingrediants: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  addIngredientHandler = (type) => {
    const oldCounts = this.state.ingrediants[type];
    const updatedCounts = oldCounts + 1;
    const updatedIngrediants = { ...this.state.ingrediants };
    updatedIngrediants[type] = updatedCounts;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingrediants: updatedIngrediants,
    });
    this.updatePurchaseState(updatedIngrediants);
  };

  RemoveIngredientHandler = (type) => {
    const oldCounts = this.state.ingrediants[type];
    if (oldCounts === 0) {
      return;
    }
    const updatedCounts = oldCounts - 1;
    const updatedIngrediants = { ...this.state.ingrediants };
    updatedIngrediants[type] = updatedCounts;
    const priceExtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceExtraction;
    this.setState({
      totalPrice: newPrice,
      ingrediants: updatedIngrediants,
    });
    this.updatePurchaseState(updatedIngrediants);
  };

  updatePurchaseState = (updatedIngrediants) => {
    const updateQuantity = Object.keys(updatedIngrediants)
      .map((typ) => {
        return updatedIngrediants[typ];
      })
      .reduce((sum, el) => {
        console.log("ELELELELEL");
        console.log(el);
        return sum + el;
      }, 0);
    let purchaseable;
    if (updateQuantity > 0) {
      purchaseable = true;
    } else {
      purchaseable = false;
    }
    this.setState({ purchaseable: purchaseable });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  stopPurchaseHandler = () => {
    this.setState({ purchasing: false});
  };
  contPurchaseHandler = () => {
    // alert("success!!!!");
    this.setState({loading:true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Max Schwarzmüller",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ purchasing: false,loading:false });
        console.log(response);
      })
      .catch((error) => {
        this.setState({ purchasing: false,loading:false});
      });
  };
  render() {
    const disableInfo = { ...this.state.ingrediants };
    for (let type in disableInfo) {
      if (disableInfo[type] <= 0) {
        disableInfo[type] = true;
      } else {
        disableInfo[type] = false;
      }
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingrediants}
        contPurch={this.contPurchaseHandler}
        cancelPurch={this.stopPurchaseHandler}
        totalPrice={this.state.totalPrice}
      />
    );
    if(this.state.loading){
      orderSummary = (<Spinner/>);
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} cancel={this.stopPurchaseHandler}>
          {orderSummary}
        </Modal>
        <Burger ingrediants={this.state.ingrediants} />
        <BuildControls
          price={this.state.totalPrice}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.RemoveIngredientHandler}
          diableInfo={disableInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          cancel={this.stopPurchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
