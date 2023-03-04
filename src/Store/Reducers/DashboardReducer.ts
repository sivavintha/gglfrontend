import { createSlice } from "@reduxjs/toolkit";
import { IDashboardState } from "../../Interfaces";
import { TBooking } from "../../Types";

const initialState: IDashboardState = {
  dashboard: {
    customerCount: 0,
    vendorCount: 0,
    bookingCount: 0,
    commodityCount: 0,
    invoicesCount: 0,
  },
  status: null,
};

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    fetchDashboard(state, action) {
      state.dashboard = action.payload.dashboard;
    },

    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const dashboardActions = dashboardReducer.actions;

export default dashboardReducer;
