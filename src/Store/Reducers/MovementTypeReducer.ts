import { createSlice } from "@reduxjs/toolkit";
import { IMovementTypeState } from "../../Interfaces";
import { TMovementType } from "../../Types";

const initialState: IMovementTypeState = {
  movementTypes: [],
  filteredMovementTypes: [],
  currentMovementTypes: null,
  status: null,
};

const movementTypeReducer = createSlice({
  name: "movementType",
  initialState: initialState,
  reducers: {
    fetchMovementType(state, action) {
      state.movementTypes = [...action.payload.movementType];
    },
    fetchMovementTypeById(state, action) {
      state.currentMovementTypes = action.payload.movementType;
    },
    searchMovementType(state, action) {
      let AllMovementTypes = [...state.movementTypes];
      let searchedMovementTypes: TMovementType[] = [];

      searchedMovementTypes = AllMovementTypes.filter((movementType) =>
        Object.values(movementType).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredMovementTypes = searchedMovementTypes;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const movementTypeActions = movementTypeReducer.actions;

export default movementTypeReducer;
