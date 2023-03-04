import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import styles from "./CustomToggleButton.module.css";

interface ICustomToggleButton {
  value: any;
  exclusive?: boolean;
  onChange: (e: any, newvalue: string) => void;
  color: any;
  size: any;
  buttonList: any;
}

const CustomToggleButton: React.FC<ICustomToggleButton> = ({
  value,
  exclusive,
  onChange,
  color,
  size,
  buttonList,
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={onChange}
      color={color}
      size={size}
    >
      {buttonList.map((btn: any, index: number) => (
        <ToggleButton
          key={index}
          value={btn.value}
          className={styles.toggleButtons}
        >
          {btn.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;
