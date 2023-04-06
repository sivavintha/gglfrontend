import * as React from "react";
import CustomDataTable from "../../../Components/CustomDataTable";

import {
  Close,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../Hooks";

import { customerVendorActions } from "../../../Store/Reducers/CustomerVendorReducer";
import {
  deleteCustomerVendorById,
  getCustomerVendors,
} from "../../../Store/Actions/CustomerVendorActions";
import AddCustomerVendor from "./AddCustomerVendor";
import {
  Box,
  CssBaseline,
  Tabs,
  Tab,
  useTheme,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import TabPanel from "../../../Components/TabPanel";
import SwipeableViews from "react-swipeable-views";
import CustomDialog from "../../../Components/CustomDialog";
import ViewCustomerVendor from "./ViewCustomerVendor";
import { Navigate, useNavigate } from "react-router";

const CustomerVendorList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [editCustomerVendorId, setEditCustomerVendorId] =
    React.useState<any>(null);
  const [viewCustomerVendorId, setViewCustomerVendorId] =
    React.useState<any>(null);

  const [category, setCategory] = React.useState<any>("CUSTOMER");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const CustomerVendorStatus = useAppSelector(
    (state) => state.customerVendor.status
  );
  const CustomerVendorsData = useAppSelector(
    (state) => state.customerVendor.customers
  );

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (CustomerVendorStatus && CustomerVendorStatus.type) {
      enqueueSnackbar(CustomerVendorStatus.message, {
        variant: CustomerVendorStatus.type,
      });
      dispatch(
        customerVendorActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [CustomerVendorStatus]);

  React.useEffect(() => {
    dispatch(getCustomerVendors(category));
  }, [dispatch, category]);

  const deleteCustomerVendor = (id: string) => {
    dispatch(deleteCustomerVendorById(id));
  };

  const editCustomerVendor = (id: string) => {
    setEditCustomerVendorId(id);
    navigate("/master/addcustomervendor", { state: { id: id } });
  };

  const viewCustomerVendor = (id: string) => {
    setViewCustomerVendorId(id);
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

  const CustomerVendorColumn = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    { field: "emailId", headerName: "Email", width: 200 },
    { field: "mobileNumber", headerName: "Mobile Number", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    {
      field: "gstInNumber",
      headerName: "GST #",
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
          onClick={() => viewCustomerVendor(params.id)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editCustomerVendor(params.id)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteCustomerVendor(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ mt: "20px", p: "20px" }}>
        <CssBaseline />
        <Typography variant="h5" gutterBottom>
          Customer / Vendor
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
            <Tab label=" Add Customer / Vendor" />
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <TabPanel value={value} index={0}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="customerVendorlabel"
                name="customerVendor"
                value={category}
                onChange={handleCategory}
              >
                <FormControlLabel
                  value="CUSTOMER"
                  control={<Radio />}
                  label="Customer"
                />
                <FormControlLabel
                  value="VENDOR"
                  control={<Radio />}
                  label="Vendor"
                />
              </RadioGroup>
            </FormControl>
            <CustomDataTable
              columns={CustomerVendorColumn}
              rows={CustomerVendorsData}
              getRowId={(row: any) => row._id}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddCustomerVendor
            // employeeId={editEmployeeId}
            // tabChange={(index: number) => setValue(index)}
            />
          </TabPanel>
        </SwipeableViews>
      </Box>
      {openDialog && (
        <CustomDialog
          maxWidth="md"
          open={openDialog}
          title="Customer / Vendor"
          handleClose={handleCloseDialog}
          Content={<ViewCustomerVendor id={viewCustomerVendorId} />}
          Actions={<DialogActions />}
        />
      )}
    </>
  );
};

export default CustomerVendorList;
