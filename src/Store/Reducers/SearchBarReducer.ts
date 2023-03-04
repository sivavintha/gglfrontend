import { createSlice } from "@reduxjs/toolkit";
import { ISearchBar } from "../../Interfaces";

const initialState: ISearchBar = {
  searchBarValue: "",
};

const searchBarReducer = createSlice({
  name: "searchBar",
  initialState: initialState,
  reducers: {
    setSearchBarValue(state, action) {
      state.searchBarValue = action.payload;
    },
  },
});

export const searchBarActions = searchBarReducer.actions;

export default searchBarReducer;
