import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rate: {},
  
  date: "2022-01-01",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setRate(state, action) {
      state.rate = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});

export const { setRate, setDate } = exchangeSlice.actions;

export default exchangeSlice.reducer;
