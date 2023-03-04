import { createSlice } from "@reduxjs/toolkit";
import { IProfitCenterState } from "../../Interfaces";
import { TProfitCenter } from "../../Types";

const initialState: IProfitCenterState = {
  profitCenters: [],
  filteredProfitCenter: [],
  currentProfitCenter: null,
  status: null,
};

const profitCenterReducer = createSlice({
  name: "profitCenter",
  initialState: initialState,
  reducers: {
    fetchProfitCenter(state, action) {
      state.profitCenters = [...action.payload.profitCenters];
    },
    fetchProfitCenterById(state, action) {
      state.currentProfitCenter = action.payload.profitCenter;
    },
    searchProfitCenter(state, action) {
      let AllProfitCenters = [...state.profitCenters];
      let searchedProfitCenters: TProfitCenter[] = [];

      searchedProfitCenters = AllProfitCenters.filter((profitCenter) =>
        Object.values(profitCenter).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredProfitCenter = searchedProfitCenters;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const profitCenterActions = profitCenterReducer.actions;

export default profitCenterReducer;
