import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getInvoiceById } from "../../../Store/Actions/InvoiceActions";

interface IViewInvoice {
  id: string;
}

const ViewInvoice: React.FC<IViewInvoice> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentInvoice = useAppSelector(
    (state) => state.invoice.currentInvoices
  );

  useEffect(() => {
    dispatch(getInvoiceById(id));
  }, [id]);

  useEffect(() => {
    console.log("currentInvoice ===>", currentInvoice);
  }, [currentInvoice]);

  return (
    <Grid container sx={{ mt: "10px", flex: 1, alignItems: "top" }} spacing={1}>
      <Grid item xs={12} md={6} container>
        <Grid item xs={12} md={6}>
          <FormLabel>Invoice No: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentInvoice && currentInvoice?.invoiceNo}
          </Typography>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <FormLabel>Invoice Date: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentInvoice && currentInvoice.invoiceDate
              ? currentInvoice.invoiceDate
              : null}
          </Typography>
        </Grid> */}

        <Grid item xs={12} md={6}>
          <FormLabel>Invoice Category: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentInvoice && currentInvoice?.invoiceCategory}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Billing Party: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentInvoice && currentInvoice.billingParty
              ? currentInvoice.billingParty.name
              : ""}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Billing To: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentInvoice &&
              currentInvoice.billingTo &&
              currentInvoice.billingTo}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewInvoice;
