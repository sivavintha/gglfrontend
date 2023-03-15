import { createSlice } from "@reduxjs/toolkit";
import { IContainerTypeState } from "../../Interfaces";
import { TContainerType } from "../../Types";

const initialState: IContainerTypeState = {
  containerTypes: [],
  filteredContainerTypes: [],
  currentContainerTypes: null,
  status: null,
};

const containerTypeReducer = createSlice({
  name: "containerType",
  initialState: initialState,
  reducers: {
    fetchContainerType(state, action) {
      state.containerTypes = [...action.payload.containerType];
    },
    fetchContainerTypeById(state, action) {
      state.currentContainerTypes = action.payload.containerType;
    },
    searchContainerType(state, action) {
      let AllContainerTypes = [...state.containerTypes];
      let searchedContainerTypes: TContainerType[] = [];

      searchedContainerTypes = AllContainerTypes.filter((containerType) =>
        Object.values(containerType).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredContainerTypes = searchedContainerTypes;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const containerTypeActions = containerTypeReducer.actions;

export default containerTypeReducer;
