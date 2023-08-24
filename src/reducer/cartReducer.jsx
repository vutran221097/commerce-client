import { createSlice } from "@reduxjs/toolkit";
// import { getFromStorage, isEmptyObject, saveToStorage } from "../utils/utils";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      // count total amount
      const updatedTotalAmount =
        state.totalAmount +
        action.payload.item.price * action.payload.item.amount;
      // find item index
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload.item._id
      );
      // get item from index
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      // if item is existing in cart
      if (existingCartItem) {
        // change amount number
        const updatedItem = {
          ...existingCartItem,
          amount:
            Number(existingCartItem.amount) +
            Number(action.payload.item.amount),
        };
        // coppy cart item arr
        updatedItems = [...state.items];
        // replace new item from item index
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // if item not in arr then push it in
        updatedItems = state.items.concat(action.payload.item);
      }
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    removeCart(state, action) {
      // find item with id
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      // check if item exist
      const existingItem = state.items[existingCartItemIndex];
      // minus total amount
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        // if item quantity < 1 filter item not include item have quantity = 0 (remove item from arr)
        updatedItems = state.items.filter(
          (item) => item._id !== action.payload
        );
      } else {
        // update quantity for item
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        // replace item in cart items
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    deleteCart(state, action) {
      // find item by id
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      // count total amount after delete item from array
      const updatedTotalAmount =
        state.totalAmount - existingItem.price * existingItem.amount;

      let updatedItems;
      // return new cart items
      updatedItems = state.items.filter(
        (item) => item._id !== action.payload
      );

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      return state;
    },
    resetCart(state) {
      state.items = []
      state.totalAmount = 0
      return state;
    },
  },
});

export const { addCart, removeCart, deleteCart, resetCart } = cart.actions;
export default cart.reducer;
