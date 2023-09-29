import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "../features/plant/plantSlice";

const store = configureStore({
  reducer: { plant: plantReducer },
});

export default store;
