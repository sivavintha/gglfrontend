import { createSlice } from "@reduxjs/toolkit";
import { IBasisTypeState } from "../../Interfaces";
import { TBasisType } from "../../Types";

const initialState: IBasisTypeState = {
  basisTypes: [],
  filteredBasisTypes: [],
  currentBasisTypes: null,
  status: null,
};

const basisTypeReducer = createSlice({
  name: "basisType",
  initialState: initialState,
  reducers: {
    fetchBasisType(state, action) {
      state.basisTypes = [...action.payload.basisType];
    },
    fetchBasisTypeById(state, action) {
      state.currentBasisTypes = action.payload.basisType;
    },
    searchBasisType(state, action) {
      let AllBasisTypes = [...state.basisTypes];
      let searchedBasisTypes: TBasisType[] = [];

      searchedBasisTypes = AllBasisTypes.filter((basisType) =>
        Object.values(basisType).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredBasisTypes = searchedBasisTypes;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const basisTypeActions = basisTypeReducer.actions;

export default basisTypeReducer;
