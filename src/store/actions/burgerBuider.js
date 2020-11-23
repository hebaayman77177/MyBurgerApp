
import * as actionTypes from "./actionTypes";



export const updatePurchaseState = (ingrediants)=>{
    return { type: actionTypes.UPDATE_PURCHASE_STATE ,ingrediants:ingrediants}
}

export const addIngredientHandler = (type)=>{
    return { type: actionTypes.ADD_INGREDIANT_HANDLER,ingrediant: type}
}

export const removeIngredientHandler = (type)=>{
    return { type: actionTypes.REMOVE_INGREDIANT_HANDLER,ingrediant: type}
}