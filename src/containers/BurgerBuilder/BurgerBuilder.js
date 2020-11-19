import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionTypes from "../../reducers/actions"

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axios
    //   .get("https://my-burger-app-40660.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.props.updatePurchaseState();
    //   })
    //   .catch((err) => {});
    this.props.updatePurchaseState();
  }

  
  // updatePurchaseState = (updatedIngrediants) => {
  //   const updateQuantity = Object.keys(updatedIngrediants)
  //     .map((typ) => {
  //       return updatedIngrediants[typ];
  //     })
  //     .reduce((sum, el) => {
  //       return sum + el;
  //     }, 0);
  //   let purchaseable;
  //   if (updateQuantity > 0) {
  //     purchaseable = true;
  //   } else {
  //     purchaseable = false;
  //   }
  //   this.setState({ purchaseable: purchaseable });
  // };




  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  stopPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  contPurchaseHandler = () => {
    this.props.history.push(`/check-out?`)
  };

  render() {
    const disableInfo = { ...this.props.ingrediants };
    console.log("here")
    console.log(disableInfo);
    for (let type in disableInfo) {
      console.log("here")
      console.log(disableInfo[type],disableInfo[type]<=0)
      if (disableInfo[type] <= 0) {
        console.log("here")
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
    if (this.props.ingrediants) {
      burger = (
        <Aux>
          <Burger ingrediants={this.props.ingrediants} />
          <BuildControls
            price={this.props.totalPrice}
            addIngredient={this.props.addIngredientHandler}
            removeIngredient={this.props.removeIngredientHandler}
            diableInfo={disableInfo}
            purchaseable={this.props.purchaseable}
            ordered={this.purchaseHandler}
            cancel={this.stopPurchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrediants}
          contPurch={this.contPurchaseHandler}
          cancelPurch={this.stopPurchaseHandler}
          totalPrice={this.props.totalPrice}
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


const mapStateToProps = (state) => {
  return {
    ingrediants: state.ingrediants,
    totalPrice: state.totalPrice,
    purchaseable:state.purchaseable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePurchaseState: () => dispatch({ type: actionTypes.UPDATE_PURCHASE_STATE }),
    addIngredientHandler: (type) => dispatch({ type: actionTypes.ADD_INGREDIANT_HANDLER,ingrediant: type}),
    removeIngredientHandler: (type) => dispatch({ type: actionTypes.REMOVE_INGREDIANT_HANDLER,ingrediant: type}),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
