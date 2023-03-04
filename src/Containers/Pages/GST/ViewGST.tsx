import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getGSTById } from "../../../Store/Actions/GSTActions";
import moment from "moment";

interface IViewGST {
  id: string;
}

const ViewGST: React.FC<IViewGST> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentGST = useAppSelector((state) => state.gst.currentGST);

  const formatDate = (date: any) => {
    return moment(date).format("DD-MM-YYYY");
  };

  useEffect(() => {
    dispatch(getGSTById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <FormLabel>GST: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">{currentGST && currentGST?.gst}</Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>SGST: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentGST && currentGST?.sgst}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>CGST: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentGST && currentGST?.cgst}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>IGST: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentGST && currentGST?.igst}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>VALID FROM: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentGST && currentGST.effectiveFrom
            ? formatDate(currentGST.effectiveFrom)
            : ""}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormLabel>VALID TO: </FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          {currentGST && currentGST.effectiveTo
            ? formatDate(currentGST.effectiveTo)
            : ""}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewGST;
