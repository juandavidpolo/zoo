import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../actions";
import https from "src/https/https";

export const getAnimals = createAsyncThunk("getAnimals", async (payload, thunkAPI) => {
  let url = `/animals?type=${payload.type}`;
  if (payload && payload.firstSortOrder && payload.firstSortOrder !== ""){
    url += `&sortBy=${payload.firstSort}&order=${payload.firstSortOrder}`
  }
  if (payload && payload.secondSortOrder && payload.secondSortOrder !== "") {
    url += `&sortBy=${payload.secondSort}&order=${payload.secondSortOrder}`
  }
  try {
    let response = await https.get(url);
    if (response && response.status === 200 && response.data) {
      return response.data
    }
  } catch (e) {
    console.log("Error:", e.response)
    thunkAPI.dispatch(notification({ message: e.response, type:"danger"}))
  }
})

export const deleteAnimal = createAsyncThunk("deleteAnimal", async (payload, thunkAPI) => {
  try {
    let response = await https.delete(`/animals/${payload}`);
    if (response && response.status === 200 && response.data) {
      thunkAPI.dispatch(notification({ message: "The animal have been deleted", type: "success" }))
      let filterData = {type: ""}
      thunkAPI.dispatch(getAnimals(filterData));
      return response.data
    }
  } catch (e) {
    console.log("Error:", e.response)
    thunkAPI.dispatch(notification({ message: e.response, type: "danger" }))
  }
})

export const updateAnimal = createAsyncThunk("updateAnimal", async (payload, thunkAPI) => {
  try {
    let response = await https.put(`/animals/${payload.id}`, payload);
    if (response && response.status === 200 && response.data) {
      thunkAPI.dispatch(notification({ message: "Checkup updated for the animal", type: "success" }))
      let filterData = { type: "" }
      thunkAPI.dispatch(getAnimals(filterData));
    }
  } catch (e) {
    console.log("Error:", e.response)
    thunkAPI.dispatch(notification({ message: e.response, type: "danger" }))
  }
})