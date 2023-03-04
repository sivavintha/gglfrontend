import React from "react";
import { Fab, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getContractById } from "../../../Store/Actions/ContractActions";

interface IViewContract {
  id: string;
}

const ViewContract: React.FC<IViewContract> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [openPrintDialog, setOpenPrintDialog] = React.useState(false);

  const currentContract = useAppSelector(
    (state) => state.contract.currentContract
  );

  const handleClosePrintDialog = () => {
    setOpenPrintDialog(false);
  };

  React.useEffect(() => {
    dispatch(getContractById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={10} container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormLabel>Code: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.code}{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Status: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="body1"
            sx={{
              color: currentContract?.isFinal ? "red" : "yellowgreen",
              fontWeight: "Bold",
            }}
          >
            {currentContract && currentContract.isFinal ? "FINAL" : "DRAFT"}{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Buyer: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.buyer?.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Seller: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.seller?.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Commodity: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.commodity?.commodityName}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Origin: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.origin?.originName}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>OutTurn: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.outTurn}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Nut Count: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.nutCount}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Moisture: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.moisture}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Quantity: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.quantity}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Packing: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.packing}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Payment Terms </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.paymentTerms}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Price: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.rate}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Shipment Advice: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.shipmentAdvice}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Cargo Location: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.cargoLocation}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Bank Details: </FormLabel>
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel>Account Name: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract && currentContract?.accountDetails?.accountName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Account Number: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract &&
                currentContract?.accountDetails?.accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Bank Name: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract && currentContract?.accountDetails?.bankName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Bank Branch: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract && currentContract?.accountDetails?.bankBranch}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>IFSC Code: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract && currentContract?.accountDetails?.ifscCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Swift Code: </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {currentContract && currentContract?.accountDetails?.swiftCode}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Remarks: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentContract && currentContract?.remarks}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        {/* <Fab>
          <Print />
        </Fab> */}
      </Grid>
    </Grid>
  );
};

export default ViewContract;
