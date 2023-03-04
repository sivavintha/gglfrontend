// import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../Hooks";
import { searchBarActions } from "../../Store/Reducers/SearchBarReducer";

const SearchStyledBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "solid 1px black",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    border: "solid 2px #9c27b0",
    color: alpha("#9c27b0", 1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = () => {
  const searchValue = useAppSelector((state) => state.searchBar.searchBarValue);
  const dispatch = useAppDispatch();

  const searchValueChangeHandler = (event: any) => {
    dispatch(searchBarActions.setSearchBarValue(event.target.value));
  };

  return (
    <SearchStyledBar>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={searchValueChangeHandler}
      />
    </SearchStyledBar>
  );
};

export default SearchBar;
