import * as actionTypes from "./actions";

const initialState = {
  ingrediants: { salad: 0, cheese: 0, meat: 0, bacon: 0 },
  totalPrice: 4,
  purchaseable: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 0.4,
};

const updatePurchaseState = (state) => {
  let totalPrice = 4;
  totalPrice = Object.keys(state.ingrediants).reduce((acc, ingr) => {
    acc += state.ingrediants[ingr] * INGREDIENT_PRICES[ingr];
    return acc;
  }, totalPrice);
  const updateQuantity = Object.keys(state.ingrediants)
    .map((typ) => {
      return state.ingrediants[typ];
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
  const updatedState = {
    ...state,
    purchaseable: purchaseable,
    ingrediants: state.ingrediants,
    totalPrice: totalPrice,
  };
  return updatedState;
};

const addIngredientHandler = (state, type) => {
  let oldCounts = state.ingrediants[type];
  if (oldCounts === undefined) {
    oldCounts = 0;
  }
  const updatedCounts = oldCounts + 1;
  const updatedIngrediants = { ...state.ingrediants };
  updatedIngrediants[type] = updatedCounts;
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  let purchaseable = false;
  if (newPrice > 4) {
    purchaseable = true;
  }
  return {
    ...state,
    totalPrice: newPrice,
    ingrediants: updatedIngrediants,
    purchaseable: purchaseable,
  };
};

const removeIngredientHandler = (state, type) => {
  const oldCounts = state.ingrediants[type];
  if (oldCounts === 0) {
    return {
      ...state,
      ingrediants: {
        ...state.ingrediants,
      },
    };
  }
  const updatedCounts = oldCounts - 1;
  const updatedIngrediants = { ...state.ingrediants };
  updatedIngrediants[type] = updatedCounts;
  const priceExtraction = INGREDIENT_PRICES[type];
  const oldPrice = state.totalPrice;
  const newPrice = oldPrice - priceExtraction;
  let purchaseable = false;
  if (newPrice > 4) {
    purchaseable = true;
  }
  return {
    ...state,
    totalPrice: newPrice,
    ingrediants: updatedIngrediants,
    purchaseable: purchaseable,
  };
  // this.updatePurchaseState(updatedIngrediants);
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PURCHASE_STATE:
      return updatePurchaseState(state);
    case actionTypes.ADD_INGREDIANT_HANDLER:
      return addIngredientHandler(state, action.ingrediant);
    case actionTypes.REMOVE_INGREDIANT_HANDLER:
      return removeIngredientHandler(state, action.ingrediant);
  }
  return {
    ...state,
    ingrediants: {
      ...state.ingrediants,
    },
  };
};

export default reducer;
