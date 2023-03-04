import { createSlice } from "@reduxjs/toolkit";
import { IContractState } from "../../Interfaces";
import { TContract } from "../../Types";

const initialState: IContractState = {
  contracts: [],
  filteredContracts: [],
  currentContract: null,
  status: null,
  lastSavedRecord: null,
  printContract: null,
};

const contractReducer = createSlice({
  name: "contract",
  initialState: initialState,
  reducers: {
    fetchContracts(state, action) {
      state.contracts = [...action.payload.contracts];
    },
    fetchContractById(state, action) {
      state.currentContract = action.payload.contract;
    },
    searchContract(state, action) {
      let AllContracts = [...state.contracts];
      let searchedContracts: TContract[] = [];

      searchedContracts = AllContracts.filter((contract) =>
        Object.values(contract).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredContracts = searchedContracts;
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
    setPrintContract(state, action) {
      state.printContract = action.payload.contract;
    },
  },
});

export const contractActions = contractReducer.actions;

export default contractReducer;
