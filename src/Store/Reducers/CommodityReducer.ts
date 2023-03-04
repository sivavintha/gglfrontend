import { createSlice } from "@reduxjs/toolkit";
import { ICommodityState } from "../../Interfaces";
import { TCommodity } from "../../Types";

const initialState: ICommodityState = {
  commodity: [],
  filteredCommodity: [],
  currentCommodity: null,
  status: null,
};

const commodityReducer = createSlice({
  name: "commodity",
  initialState: initialState,
  reducers: {
    fetchCommodity(state, action) {
      state.commodity = [...action.payload.commodity];
    },
    fetchCommodityById(state, action) {
      state.currentCommodity = action.payload.commodity;
    },
    searchCommodity(state, action) {
      let AllCommoditys = [...state.commodity];
      let searchedCommoditys: TCommodity[] = [];

      searchedCommoditys = AllCommoditys.filter((commodity) =>
        Object.values(commodity).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredCommodity = searchedCommoditys;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const commodityActions = commodityReducer.actions;

export default commodityReducer;
