import { createSlice } from "@reduxjs/toolkit";
import { IInvoiceState } from "../../Interfaces";
import { TInvoice } from "../../Types";

const initialState: IInvoiceState = {
  invoices: [],
  filteredInvoices: [],
  currentInvoices: null,
  status: null,
  printInvoice: null,
  lastSavedRecord: null,
};

const invoiceReducer = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    fetchInvoices(state, action) {
      state.invoices = [...action.payload.invoices];
    },
    fetchInvoiceById(state, action) {
      state.currentInvoices = action.payload.invoice;
    },
    searchInvoice(state, action) {
      let AllInvoices = [...state.invoices];
      let searchedInvoices: TInvoice[] = [];

      searchedInvoices = AllInvoices.filter((invoice) =>
        Object.values(invoice).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredInvoices = searchedInvoices;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
    setLastSavedRecord(state, action) {
      state.lastSavedRecord = action.payload;
    },
    setPrintInvoice(state, action) {
      state.printInvoice = action.payload.contract;
    },
  },
});

export const invoiceActions = invoiceReducer.actions;

export default invoiceReducer;
