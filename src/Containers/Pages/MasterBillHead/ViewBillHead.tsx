import React, { useEffect } from "react";
import { FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getBillHeadById } from "../../../Store/Actions/BillHeadActions";

interface IViewBillHead {
  id: string;
}

const ViewBillHead: React.FC<IViewBillHead> = ({ id }) => {
  const dispatch = useAppDispatch();

  const [gst, setGst] = React.useState("");
  const currentBillHead = useAppSelector(
    (state) => state.billHead.currentBillHead
  );

  useEffect(() => {
    dispatch(getBillHeadById(id));
  }, [id]);

  useEffect(() => {
    if (currentBillHead && currentBillHead.gstSlab) {
      setGst(currentBillHead.gstSlab.gst);
    }
  }, [currentBillHead]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={12} sm={4}>
          <FormLabel>Code: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentBillHead && currentBillHead?.code}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>BillHead: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentBillHead && currentBillHead?.billHeadName}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>SAC: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentBillHead && currentBillHead?.sac}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>GST Applicable: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {currentBillHead && currentBillHead?.gstApplicable === true
              ? "Yes"
              : "No"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>GST Slab: </FormLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {gst}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewBillHead;
