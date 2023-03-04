import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { eventActions } from "../../../Store/Reducers/EventReducer";
import {
  deleteEventById,
  getEvent,
} from "../../../Store/Actions/EventActions";
import AddEvent from "./AddEvent";
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
import ViewEvent from "./ViewEvent";
import { useNavigate } from "react-router";

const EventList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editEventId, setEditEventId] = React.useState<any>(null);
  const [viewEventId, setViewEventId] = React.useState<any>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const EventStatus = useAppSelector((state) => state.event.status);
  const EventData = useAppSelector((state) => state.event.event);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (EventStatus && EventStatus.type) {
      enqueueSnackbar(EventStatus.message, {
        variant: EventStatus.type,
      });
      dispatch(
        eventActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [EventStatus]);

  React.useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const deleteEvent = (id: string) => {
    dispatch(deleteEventById(id));
  };

  const editEvent = (id: string) => {
    setEditEventId(id);
    navigate("/master/addevent", { state: { id: id } });
  };

  const viewEvent = (id: string) => {
    setViewEventId(id);
    setOpenDialog(true);
  };

  const getGSTRate = (params: any) => {
    return params.row.gstSlab?.gst || "";
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

  const EventColumn = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "eventName",
      headerName: "Name",
      flex: 1,
    },
    { field: "hsnCode", headerName: "HSN Code", width: 200 },
    { field: "gstApplicable", headerName: "GST Applicable", width: 200 },
    {
      field: "gstSlab",
      headerName: "GST Slab",
      width: 200,
      valueGetter: getGSTRate,
    },
    { field: "remarks", headerName: "Remarks", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => viewEvent(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editEvent(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteEvent(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          EVENTS
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
            <Tab label="Add Event" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={EventColumn}
              rows={EventData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddEvent />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Event"
          handleClose={handleCloseDialog}
          Content={<ViewEvent id={viewEventId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default EventList;
