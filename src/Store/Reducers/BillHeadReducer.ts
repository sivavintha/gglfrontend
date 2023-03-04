import { createSlice } from "@reduxjs/toolkit";
import { IBillHeadState } from "../../Interfaces";
import { TBillHead } from "../../Types";

const initialState: IBillHeadState = {
  billHeads: [],
  filteredBillHeads: [],
  currentBillHead: null,
  status: null,
};

const billHeadReducer = createSlice({
  name: "billhead",
  initialState: initialState,
  reducers: {
    fetchBillHeads(state, action) {
      state.billHeads = [...action.payload.customers];
    },

    fetchBillHeadById(state, action) {
      state.currentBillHead = action.payload.billHead;
    },
    searchBillHead(state, action) {
      let AllBillHeads = [...state.billHeads];
      let searchedBillHeads: TBillHead[] = [];

      searchedBillHeads = AllBillHeads.filter((billHead) =>
        Object.values(billHead).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredBillHeads = searchedBillHeads;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const billHeadActions = billHeadReducer.actions;

export default billHeadReducer;
