import { createSlice } from "@reduxjs/toolkit";
import { ICurrencyState } from "../../Interfaces";
import { TCurrency } from "../../Types";

const initialState: ICurrencyState = {
  currency: [],
  filteredCurrency: [],
  currentCurrency: null,
  status: null,
};

const currencyReducer = createSlice({
  name: "currency",
  initialState: initialState,
  reducers: {
    fetchCurrency(state, action) {
      state.currency = [...action.payload.currency];
    },
    fetchCurrencyById(state, action) {
      state.currentCurrency = action.payload.currency;
    },
    searchCurrency(state, action) {
      let AllCurrency = [...state.currency];
      let searchedCurrency: TCurrency[] = [];

      searchedCurrency = AllCurrency.filter((currency) =>
        Object.values(currency).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredCurrency = searchedCurrency;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const currencyActions = currencyReducer.actions;

export default currencyReducer;
