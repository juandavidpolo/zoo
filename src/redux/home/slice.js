import { createSlice } from "@reduxjs/toolkit";

import { } from "../actions"
import { getAnimals, deleteAnimal, updateAnimal } from "./actions"

const initialState = {
  loadedFirstTime:false,
  loading:false,
  animals:[],
  deleting: null,
  updatingAnimal: false
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnimals.fulfilled, (state, action) => {
      state.loadedFirstTime = true;
      state.loading = false;
      state.animals = action.payload;
    })
    builder.addCase(getAnimals.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getAnimals.rejected, (state, action) => {
      state.loadedFirstTime = true;
      state.loading = false;
    })

    builder.addCase(deleteAnimal.pending, (state, action)=>{
      state.deleteAnimal = action.meta.arg;
    })
    builder.addCase(deleteAnimal.fulfilled, (state, action) => {
      state.deleteAnimal = null;
    })
    builder.addCase(deleteAnimal.rejected, (state, action) => {
      state.deleteAnimal = null;
    })

    builder.addCase(updateAnimal.fulfilled, (state, action) =>{
      state.updatingAnimal = false;
    })
    builder.addCase(updateAnimal.pending, (state, action) => {
      state.updatingAnimal = true;
    })
    builder.addCase(updateAnimal.rejected, (state, action) => {
      state.updatingAnimal = false;
    })
  }
});

export default homeSlice.reducer;