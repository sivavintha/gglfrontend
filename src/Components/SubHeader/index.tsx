import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import { Add } from "@mui/icons-material";
// import { useNavigate } from "react-router";
// import CustomDialog from "../CustomDialog";
import SearchBar from "../SearchBar";

interface ISubheader {
  ButtonType?: string;
  heading: string;
  buttonText: string;
  navigateTo?: string;
  dialogContent?: React.ReactNode;
  icon?: React.ReactNode;
  hideDialogActions?: boolean;
  buttonClickHandler?: () => void;
  // onFormSubmit: () => void;
}

// interface IDialogActions {
//   cancelClickHandler: () => void;
//   saveClickHandler: (e: any) => void;
// }

// const DialogActions: React.FC<IDialogActions> = ({
//   cancelClickHandler,
//   saveClickHandler,
// }) => {
//   return (
//     <>
//       <Button
//         onClick={cancelClickHandler}
//         variant="contained"
//         color="info"
//         fullWidth
//       >
//         Cancel
//       </Button>
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={saveClickHandler}
//       >
//         Save
//       </Button>
//     </>
//   );
// };

const SubHeader: React.FC<ISubheader> = ({
  ButtonType,
  buttonText,
  heading,
  icon,
  navigateTo,
  buttonClickHandler,
  // dialogContent,
  // hideDialogActions,
  // onFormSubmit,
}) => {
  // const navigate = useNavigate();

  // const [openDialog, setOpenDialog] = React.useState(false);

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  const handleSubmit = (event: any, path: string) => {
    event.preventDefault();
    // if (ButtonType === "navigation") {
    //   navigate(path);
    // }

    // if (ButtonType === "dialog") {
    //   setOpenDialog(true);
    // }

    //callback

    // setTimeout(() => {
    //   setOpenDialog(false);
    //   enqueueSnackbar(`${buttonText} added successfully.`, {
    //     variant: "success",
    //   });
    // }, 2000);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                color: "secondary.main",
              }}
            >
              {heading}
            </Typography>
            <SearchBar />
            &nbsp;&nbsp;
            {ButtonType !== "icon" && (
              <Button
                variant="contained"
                endIcon={<Add />}
                color="primary"
                onClick={buttonClickHandler}
              >
                Add {buttonText}
              </Button>
            )}
            {ButtonType === "icon" && <IconButton>{icon}</IconButton>}
          </Toolbar>
        </AppBar>
      </Box>
      {/* {openDialog && (
        <CustomDialog
          open={openDialog}
          title={buttonText}
          handleClose={handleCloseDialog}
          Content={dialogContent}
          Actions={
            !hideDialogActions && (
              <DialogActions
                saveClickHandler={(e: any) =>
                  handleSubmit(e, navigateTo ? navigateTo : "")
                }
                cancelClickHandler={handleCloseDialog}
              />
            )
          }
        />
      )} */}
    </>
  );
};

export default SubHeader;
