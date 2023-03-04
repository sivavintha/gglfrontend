import { createSlice } from "@reduxjs/toolkit";
import { IFyearState } from "../../Interfaces";
import { TFyear } from "../../Types";

const initialState: IFyearState = {
  fyears: [],
  filteredFyear: [],
  currentFyear: null,
  status: null,
};

const fyearReducer = createSlice({
  name: "fyear",
  initialState: initialState,
  reducers: {
    fetchFyear(state, action) {
      state.fyears = [...action.payload.fyears];
    },
    fetchFyearById(state, action) {
      state.currentFyear = action.payload.fyear;
    },
    searchFyear(state, action) {
      let AllFyears = [...state.fyears];
      let searchedFyears: TFyear[] = [];

      searchedFyears = AllFyears.filter((fyear) =>
        Object.values(fyear).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredFyear = searchedFyears;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const fyearActions = fyearReducer.actions;

export default fyearReducer;
