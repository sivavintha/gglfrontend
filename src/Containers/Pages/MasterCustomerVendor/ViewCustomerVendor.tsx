import React, { useEffect } from "react";
import { FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getCustomerVendorById } from "../../../Store/Actions/CustomerVendorActions";

interface IViewCustomerVendor {
  id: string;
}

const ViewCustomerVendor: React.FC<IViewCustomerVendor> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentCustomerVendor = useAppSelector(
    (state) => state.customerVendor.currentCustomerVendor
  );

  useEffect(() => {
    dispatch(getCustomerVendorById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={12} sm={4}>
          <FormLabel>Code: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.code}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Category: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.category}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Name: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Email </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.emailId}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Geo Code: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.geoCode}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Mobile Number: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.mobileNumber}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Address 1: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.address1}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Address 2: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.address2}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>City: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.city}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>State: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.state}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Country: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.country}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Zipcode: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.zipcode}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>GSTIN #</FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.gstInNumber}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={12} sm={4}>
          <FormLabel>Shipper: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.isShipper === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Consignee: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor &&
            currentCustomerVendor?.isConsignee === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Notifier: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.isNotifier === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Overseas Agent: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor &&
            currentCustomerVendor?.isOverseasAgent === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>CHA: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.isCHA === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Line: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.isLine === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Transporter: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor &&
            currentCustomerVendor?.isTransporter === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Supplier: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor && currentCustomerVendor?.isSupplier === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Delivery Agent: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor &&
            currentCustomerVendor?.isDeliveryAgent === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Warehouse: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentCustomerVendor &&
            currentCustomerVendor?.isWarehouse === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCustomerVendor;
