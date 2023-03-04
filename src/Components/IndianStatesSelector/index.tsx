import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IndianStatesList from "../../Helpers/StatesList";

interface IStateSelect {
  onChange: (e: any, item: any) => void;
  error?: boolean;
  helperText?: any;
  value: any;
  // isOptionEqualToValue: any;
  inputValue: string;
  size: any;
  onInputChange: (e: any, item: any) => void;
}
const StateSelector: React.FC<IStateSelect> = ({
  onChange,
  error,
  helperText,
  value,
  // isOptionEqualToValue,
  inputValue,
  size = "medium",
  onInputChange,
}) => {
  return (
    <Autocomplete
      id="states-select-demo"
      options={IndianStatesList}
      autoHighlight
      // getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label} ({option.code}) +{option.tin}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a State"
          size={size}
          inputProps={{
            ...params.inputProps,
            // autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default StateSelector;
