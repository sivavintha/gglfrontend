import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { ICustomAutoComplete } from "../../Interfaces";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CustomAutoComplete: React.FC<ICustomAutoComplete> = ({
  options,
  defaultValue,
  onChange,
  size,
  value,
  inputLabel,
  id,
  multiple,
  inputPlaceholder,
  helperText,
  error,
  getOptionLabel,
  isOptionEqualToValue,
  renderOptionField,
}) => {
  const handleOptionLables = (option: any) => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.label ? option.label : "";
  };

  const isOptionEqualtoValueHandler = (option: any, value: any) =>
    option.label === value.label;

  return (
    <Autocomplete
      multiple={multiple}
      id={id}
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel ? getOptionLabel : handleOptionLables}
      isOptionEqualToValue={
        isOptionEqualToValue
          ? isOptionEqualToValue
          : isOptionEqualtoValueHandler
      }
      renderOption={(props, option: any, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {renderOptionField ? option[renderOptionField] : option.label}
        </li>
      )}
      // style={{ width: 500 }}
      size={size}
      value={value ? value : ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          placeholder={inputPlaceholder}
          helperText={helperText}
          error={error}
        />
      )}
      onChange={onChange}
    />
  );
};

export default CustomAutoComplete;
