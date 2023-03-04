import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { bookingActions } from "../../../Store/Reducers/BookingReducer";
import {
  deleteBookingById,
  getBookings,
} from "../../../Store/Actions/BookingActions";
import AddBooking from "./AddBooking";
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
import ViewBooking from "./ViewBooking";
import { Navigate, useNavigate } from "react-router";
import AddContainer from "./AddContainer";

const BookingList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editBookingId, setEditBookingId] = React.useState<any>(null);
  const [viewBookingId, setViewBookingId] = React.useState<any>(null);

  const [category, setCategory] = React.useState<any>("booking");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const BookingStatus = useAppSelector((state) => state.booking.status);
  const BookingsData = useAppSelector((state) => state.booking.bookings);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (BookingStatus && BookingStatus.type) {
      enqueueSnackbar(BookingStatus.message, {
        variant: BookingStatus.type,
      });
      dispatch(
        bookingActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [BookingStatus]);

  React.useEffect(() => {
    dispatch(getBookings(category));
  }, [dispatch, category]);

  const deleteBooking = (id: string) => {
    dispatch(deleteBookingById(id));
  };

  const editBooking = (id: string) => {
    setEditBookingId(id);
    navigate("/master/addbooking", { state: { id: id } });
  };

  const viewBooking = (id: string) => {
    setViewBookingId(id);
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

  const BookingColumn = [
    {
      field: "bookingNo",
      headerName: "Booking No",
      flex: 1,
    },
    {
      field: "shipper",
      headerName: "Shipper",
      flex: 1,
    },
    {
      field: "consignee",
      headerName: "Consignee",
      flex: 1,
    },
    {
      field: "line",
      headerName: "Line",
      flex: 1,
    },
    {
      field: "overseasAgent",
      headerName: "Overseas Agent",
      flex: 1,
    },
    { field: "blNo", headerName: "BL No", flex: 1 },
    { field: "mblTerms", headerName: "MBL Terms", flex: 1 },
    {
      field: "vessel",
      headerName: "Vessel",
      flex: 1,
    },
    {
      field: "voyage",
      headerName: "Voyage",
      flex: 1,
    },
    {
      field: "grossWt",
      headerName: "Gross Wt",
      flex: 1,
    },
    {
      field: "cbm",
      headerName: "CBM",
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
          onClick={() => viewBooking(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editBooking(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteBooking(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          BOOKING
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
            <Tab label=" Create Booking" />
            <Tab label=" Container Details" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <CustomDataTable
              columns={BookingColumn}
              rows={BookingsData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddBooking />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddContainer />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Booking"
          handleClose={handleCloseDialog}
          Content={<ViewBooking id={viewBookingId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default BookingList;
