import React from "react";
import { Popover } from "@mui/material";

interface IPopover {
  id: string | undefined;
  open: boolean;
  anchorEl: any;
  handleClose: (e: any) => void;
  anchorOrigin: any;
  transformOrigin: any;
  children: any;
}

const CustomPopover: React.FC<IPopover> = ({
  id,
  open,
  anchorEl,
  handleClose,
  anchorOrigin,
  transformOrigin,
  children,
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
