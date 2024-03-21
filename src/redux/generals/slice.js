import { createSlice } from "@reduxjs/toolkit";

import { } from "../actions"

const initialState = {
  notification: []
};

const generalsSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    notification: (state, action) => {
      state.notification.push(action.payload)
    }
  }
});


export const { notification } = generalsSlice.actions;
export default generalsSlice.reducer;