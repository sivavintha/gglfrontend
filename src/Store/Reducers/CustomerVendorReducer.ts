import { createSlice } from "@reduxjs/toolkit";
import { ICustomerVendorState } from "../../Interfaces";
import { TCustomerVendor } from "../../Types";

const initialState: ICustomerVendorState = {
  customers: [],
  filteredCustomerVendors: [],
  currentCustomerVendor: null,
  status: null,
  vendors: [],
};

const customerVendorReducer = createSlice({
  name: "customervendor",
  initialState: initialState,
  reducers: {
    fetchCustomers(state, action) {
      state.customers = [...action.payload.customers];
    },
    fetchVendors(state, action) {
      state.vendors = [...action.payload.vendors];
    },
    fetchCustomerVendorById(state, action) {
      state.currentCustomerVendor = action.payload.customerVendor;
    },
    searchCustomerVendor(state, action) {
      let AllCustomerVendors = [...state.customers];
      let searchedCustomerVendors: TCustomerVendor[] = [];

      searchedCustomerVendors = AllCustomerVendors.filter((customerVendor) =>
        Object.values(customerVendor).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredCustomerVendors = searchedCustomerVendors;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const customerVendorActions = customerVendorReducer.actions;

export default customerVendorReducer;
