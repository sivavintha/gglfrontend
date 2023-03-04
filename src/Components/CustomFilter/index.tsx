import { FilterList } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ICustomFilter } from "../../Interfaces";
import { TKeyValue } from "../../Types";
import CustomPopover from "../CustomPopover";
import SearchBar from "../SearchBar";

const RenderStates: React.FC<ICustomFilter> = ({ filters }) => {
  const [checkedState, setCheckedState] = React.useState<TKeyValue>({});

  const handleCheckedChange = (event: any) => {
    setCheckedState({
      ...checkedState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ mt: "10px", p: "15px", width: "100%" }}>
      <SearchBar />

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          {filters.map((filter) => (
            <FormControlLabel
              key={filter.name}
              control={
                <Checkbox
                  checked={(checkedState && checkedState[filter.name]) || false}
                  onChange={handleCheckedChange}
                  name={filter.name}
                />
              }
              label={filter.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

const CustomFilter: React.FC<ICustomFilter> = ({ filters }) => {
  //popper - filter
  const [showPopper, setShowPopper] = useState<TKeyValue>({});
  const [anchorE1, setAnchorEl] = useState<TKeyValue>({});

  useEffect(() => {
    if (filters) {
      let Obj: TKeyValue = {};

      filters.map((filter) => {
        let nam = filter.name;
        return (Obj[nam] = false);
      });
      setShowPopper(Obj);
    }
  }, [filters]);

  const togglePopOver = (event: any) => {
    setAnchorEl({
      ...anchorE1,
      [event.target.name]: event.currentTarget,
    });

    if (event.target.name) {
      let popperState = { ...showPopper };
      popperState[event.target.name] = !popperState[event.target.name];
      setShowPopper(popperState);
    } else {
      let popperState = { ...showPopper };
      Object.keys(popperState).forEach(function (key) {
        popperState[key] = false;
      });
      setShowPopper(popperState);
    }
  };
  //

  return (
    <Stack direction="row" spacing={2}>
      {filters &&
        filters.map((filter) => (
          <Box key={filter.name}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={togglePopOver}
              name={filter.name}
            >
              {filter.name}
            </Button>

            {showPopper && (
              <CustomPopover
                open={showPopper[filter.name]}
                anchorEl={anchorE1 && anchorE1[filter.name]}
                id={filter.name}
                handleClose={() => togglePopOver}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <RenderStates
                  // handleOpen={togglePopOver}
                  filters={filter.filters}
                />
              </CustomPopover>
            )}
          </Box>
        ))}
    </Stack>
  );
};

export default CustomFilter;
