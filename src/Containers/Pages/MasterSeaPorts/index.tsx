import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { seaPortsActions } from "../../../Store/Reducers/SeaPortsReducer";
import {
  deleteSeaPortsById,
  getSeaPorts,
} from "../../../Store/Actions/SeaPortsActions";
import AddSeaPorts from "./AddSeaPorts";
import {
  Box,
  CssBaseline,
  Tabs,
  Tab,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import TabPanel from "../../../Components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import CustomDialog from "../../../Components/CustomDialog";
import ViewSeaPorts from "./ViewSeaPorts";
import { useNavigate } from "react-router";

const SeaPortsList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editSeaPortsId, setEditSeaPortsId] = React.useState<any>(null);
  const [viewSeaPortsId, setViewSeaPortsId] = React.useState<any>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const SeaPortsStatus = useAppSelector((state) => state.seaPorts.status);
  const SeaPortsData = useAppSelector((state) => state.seaPorts.seaPorts);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (SeaPortsStatus && SeaPortsStatus.type) {
      enqueueSnackbar(SeaPortsStatus.message, {
        variant: SeaPortsStatus.type,
      });
      dispatch(
        seaPortsActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [SeaPortsStatus]);

  React.useEffect(() => {
    dispatch(getSeaPorts());
  }, [dispatch]);

  const deleteSeaPorts = (id: string) => {
    dispatch(deleteSeaPortsById(id));
  };

  const editSeaPorts = (id: string) => {
    setEditSeaPortsId(id);
    navigate("/master/addseaPorts", { state: { id: id } });
  };

  const viewSeaPorts = (id: string) => {
    setViewSeaPortsId(id);
    setOpenDialog(true);
  };

  const DialogActions = () => {
    return (
      <>
        <Button onClick={handleCloseDialog} variant="contained">
          <Close /> Close
        </Button>
      </>
    );
  };

  const SeaPortsColumn = [
    {
      field: "portCode",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "portName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => viewSeaPorts(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editSeaPorts(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteSeaPorts(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          SEA PORTS
        </Typography>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              color: "rgba(0, 140, 255, 0.966)",
            }}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Current List" />
            <Tab label="Add SeaPorts" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={SeaPortsColumn}
              rows={SeaPortsData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddSeaPorts />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="SeaPorts"
          handleClose={handleCloseDialog}
          Content={<ViewSeaPorts id={viewSeaPortsId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default SeaPortsList;
