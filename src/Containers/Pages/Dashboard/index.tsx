import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import CustomCard from "../../../Components/CustomCard";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { useSnackbar } from "notistack";
import { getDashboard } from "../../../Store/Actions/DashboardActions";
import { dashboardActions } from "../../../Store/Reducers/DashboardReducer";
import cashew from "../../../Assets/icons/cashew.gif";
import customers from "../../../Assets/icons/customers.gif";
import customer from "../../../Assets/icons/customer.gif";

import openBox from "../../../Assets/icons/openBox.gif";
import document from "../../../Assets/icons/document.gif";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dashboardDetails = useAppSelector((state) => state.dashboard.dashboard);
  const dashboardStatus = useAppSelector((state) => state.dashboard.status);

  React.useEffect(() => {
    if (dashboardStatus && dashboardStatus.type) {
      enqueueSnackbar(dashboardStatus.message, {
        variant: dashboardStatus.type,
      });
      dispatch(
        dashboardActions.setStatus({
          statusType: "",
          message: "",
        })
      );
    }
  }, [dashboardStatus]);

  React.useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const CustomerCount = () => {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              # of Customers
            </Typography>
            <Typography variant="h3" component="div">
              {dashboardDetails.customerCount}
            </Typography>
          </Box>
          <img src={customer} alt="" style={{ width: "100px" }} />
        </Box>
      </>
    );
  };

  const VendorCount = () => {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              # of Vendors
            </Typography>
            <Typography variant="h3" component="div">
              {dashboardDetails.vendorCount}
            </Typography>
          </Box>
          <img src={customers} alt="" style={{ width: "100px" }} />
        </Box>
      </>
    );
  };

  const CommodityCount = () => {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              # of Commodities
            </Typography>
            <Typography variant="h3" component="div">
              {dashboardDetails.commodityCount}
            </Typography>
          </Box>
          <img src={cashew} alt="" style={{ width: "100px" }} />
        </Box>
      </>
    );
  };
  const BookingCount = () => {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              # of Bookings
            </Typography>
            <Typography variant="h3" component="div">
              {dashboardDetails.bookingCount}
            </Typography>
          </Box>
          <img src={openBox} alt="" style={{ width: "100px" }} />
        </Box>
      </>
    );
  };
  const InvoiceCount = () => {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              # of Invoices
            </Typography>
            <Typography variant="h3" component="div">
              {dashboardDetails.invoicesCount}
            </Typography>
          </Box>
          <img src={document} alt="" style={{ width: "100px" }} />
        </Box>
      </>
    );
  };
  return (
    <Box component="main">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomCard cardContent={<CustomerCount />} containerWidth="100%" />
        </Grid>
        <Grid item xs={3}>
          <CustomCard cardContent={<VendorCount />} containerWidth="100%" />
        </Grid>
        <Grid item xs={3}>
          <CustomCard cardContent={<CommodityCount />} containerWidth="100%" />
        </Grid>
        <Grid item xs={3}>
          <CustomCard cardContent={<BookingCount />} containerWidth="100%" />
        </Grid>
        <Grid item xs={3}>
          <CustomCard cardContent={<InvoiceCount />} containerWidth="100%" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
