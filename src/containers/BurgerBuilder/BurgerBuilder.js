import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.4,
};
class BurgerBuilder extends Component {
  state = {
    ingrediants: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get("https://my-burger-app-40660.firebaseio.com/ingredients.json")
      .then((response) => {
        // this.setState({ ingrediants: response.data });
        this.updatePurchaseState(response.data);
        let totalPrice = 4;
        totalPrice = Object.keys(response.data).reduce((acc,ingr)=>{
          acc += response.data[ingr] * INGREDIENT_PRICES[ingr]
          return acc
        },totalPrice)
        this.setState({ ingrediants: response.data,totalPrice:totalPrice})
        console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttt",totalPrice)
        
      })
      .catch((err) => {});
  }

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
    console.log("fffffffffffffffffffffffffffffffffffffffff",updatedIngrediants)
    const updateQuantity = Object.keys(updatedIngrediants)
      .map((typ) => {
        return updatedIngrediants[typ];
      })
      .reduce((sum, el) => {
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
    this.setState({ purchasing: false });
  };
  contPurchaseHandler = () => {

    this.props.history.push(`/check-out?salad=${this.state.ingrediants.salad}&meat=${this.state.ingrediants.meat}&cheese=${this.state.ingrediants.cheese}&bacon=${this.state.ingrediants.bacon}&price=${this.state.totalPrice}`)
    
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


    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;
    if (this.state.ingrediants) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingrediants}
          contPurch={this.contPurchaseHandler}
          cancelPurch={this.stopPurchaseHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }


    
    return (
      <Aux>
        <Modal show={this.state.purchasing} cancel={this.stopPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
