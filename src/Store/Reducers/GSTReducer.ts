import { createSlice } from "@reduxjs/toolkit";
import { IGSTState } from "../../Interfaces";
import { TGST } from "../../Types";

const initialState: IGSTState = {
  gst: [],
  filteredGST: [],
  currentGST: null,
  status: null,
};

const gstReducer = createSlice({
  name: "gst",
  initialState: initialState,
  reducers: {
    fetchGST(state, action) {
      state.gst = [...action.payload.gst];
    },
    fetchGSTById(state, action) {
      state.currentGST = action.payload.gst;
    },
    searchGST(state, action) {
      let AllGSTs = [...state.gst];
      let searchedGSTs: TGST[] = [];

      searchedGSTs = AllGSTs.filter((gst) =>
        Object.values(gst).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredGST = searchedGSTs;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const gstActions = gstReducer.actions;

export default gstReducer;
