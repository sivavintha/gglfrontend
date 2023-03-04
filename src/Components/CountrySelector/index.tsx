import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CountryList from "../../Helpers/countryList";

interface ICountrySelect {
  onChange: (e: any, item: any) => void;
  error?: boolean;
  helperText?: any;
  value: any;
  // isOptionEqualToValue: any;
  inputValue: string;
  size: any;
  onInputChange: (e: any, item: any) => void;
}
const CountrySelector: React.FC<ICountrySelect> = ({
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
    // <Autocomplete
    //   id="country-select"
    //   options={CountryList}
    //   autoHighlight
    //   getOptionLabel={(option) => option.label}
    //   isOptionEqualToValue={isOptionEqualToValue}
    //   value={value}
    //   renderOption={(props, option) => (
    //     <Box
    //       component="li"
    //       sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
    //       {...props}
    //     >
    //       <img
    //         loading="lazy"
    //         width="20"
    //         src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
    //         srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
    //         alt=""
    //       />
    //       {option.label} ({option.code}) +{option.phone}
    //     </Box>
    //   )}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       error={error}
    //       helperText={helperText}
    //       label="Country"
    //       inputProps={{
    //         ...params.inputProps,
    //         // autoComplete: "Country", // disable autocomplete and autofill
    //       }}
    //     />
    //   )}
    //   onChange={onChange}
    //   inputValue={inputValue}
    //   onInputChange={onInputChange}
    // />
    <Autocomplete
      id="country-select-demo"
      options={CountryList}
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
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          size={size}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelector;
