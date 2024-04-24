import { configureStore } from "@reduxjs/toolkit";
import exchangeSlice from "./slice";

const store = configureStore({
  reducer: {
    exchange: exchangeSlice,
  },
});

export default store;
