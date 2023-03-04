import { createSlice } from "@reduxjs/toolkit";
import { ISeaPortsState } from "../../Interfaces";
import { TSeaPorts } from "../../Types";

const initialState: ISeaPortsState = {
  seaPorts: [],
  filteredSeaPorts: [],
  currentSeaPort: null,
  status: null,
};

const seaPortsReducer = createSlice({
  name: "seaPorts",
  initialState: initialState,
  reducers: {
    fetchSeaPorts(state, action) {
      state.seaPorts = [...action.payload.seaPorts];
    },
    fetchSeaPortsById(state, action) {
      state.currentSeaPort = action.payload.seaPorts;
    },
    searchSeaPorts(state, action) {
      let AllSeaPortss = [...state.seaPorts];
      let searchedSeaPortss: TSeaPorts[] = [];

      searchedSeaPortss = AllSeaPortss.filter((seaPorts) =>
        Object.values(seaPorts).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredSeaPorts = searchedSeaPortss;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const seaPortsActions = seaPortsReducer.actions;

export default seaPortsReducer;
