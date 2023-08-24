import { combineReducers } from "redux";

import popupReducer from "./popupReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  popup: popupReducer,
  auth: authReducer,
  cart: cartReducer
});
