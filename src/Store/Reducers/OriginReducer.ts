import { createSlice } from "@reduxjs/toolkit";
import { IOriginState } from "../../Interfaces";
import { TOrigin } from "../../Types";

const initialState: IOriginState = {
  origin: [],
  filteredOrigin: [],
  currentOrigin: null,
  status: null,
};

const originReducer = createSlice({
  name: "origin",
  initialState: initialState,
  reducers: {
    fetchOrigin(state, action) {
      state.origin = [...action.payload.origin];
    },
    fetchOriginById(state, action) {
      state.currentOrigin = action.payload.origin;
    },
    searchOrigin(state, action) {
      let AllOrigins = [...state.origin];
      let searchedOrigins: TOrigin[] = [];

      searchedOrigins = AllOrigins.filter((origin) =>
        Object.values(origin).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredOrigin = searchedOrigins;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const originActions = originReducer.actions;

export default originReducer;
