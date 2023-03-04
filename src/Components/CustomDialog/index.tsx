import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ICustomDialog } from "../../Interfaces";
import { Divider } from "@mui/material";

const CustomDialog: React.FC<ICustomDialog> = ({
  open,
  handleClose,
  title,
  contentText,
  Content,
  Actions,
  maxWidth = "sm",
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={maxWidth}>
        <DialogTitle>
          {title}
          <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          {Content}
        </DialogContent>
        <DialogActions>{Actions}</DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
