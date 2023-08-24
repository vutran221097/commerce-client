import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  currentItem: {},
};

const popup = createSlice({
  name: "popup",
  initialState,
  reducers: {
    // show popup
    showPopup(state, action) {
      const { item } = action.payload;
      state.isOpen = true;
      state.currentItem = item;
      return state;
    },
    // hide popup
    hidePopup(state) {
      state.isOpen = false;
      state.currentItem = {};
      return state;
    },
  },
});

export const { showPopup, hidePopup } = popup.actions;
export default popup.reducer;
