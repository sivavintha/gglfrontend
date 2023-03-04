import { ISpinnerState } from "../../Interfaces/index";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ISpinnerState = {
  loading: false,
  color: "#ffb74d",
};

const spinnerReducer = createSlice({
  name: "spinner",
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const spinnerActions = spinnerReducer.actions;

export default spinnerReducer;
