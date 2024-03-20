import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./home/slice";

import generalsSlice from "./generals/slice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    general: generalsSlice
  }
});

export default store;