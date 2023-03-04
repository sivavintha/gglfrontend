import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { IToast } from "../../Interfaces";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomToast: React.FC<IToast> = ({
  open,
  hideDuration = 6000,
  closeHandler,
  severity,
  message,
}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        open={open}
        autoHideDuration={hideDuration}
        onClose={closeHandler}
      >
        <Alert
          onClose={closeHandler}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomToast;
