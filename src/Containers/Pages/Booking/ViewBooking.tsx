import React, { useEffect } from "react";
import { Avatar, FormLabel, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { getBookingById } from "../../../Store/Actions/BookingActions";
import { Photo } from "@mui/icons-material";

interface IViewBooking {
  id: string;
}

const ViewBooking: React.FC<IViewBooking> = ({ id }) => {
  const dispatch = useAppDispatch();

  const currentBooking = useAppSelector(
    (state) => state.booking.currentBooking
  );

  useEffect(() => {
    dispatch(getBookingById(id));
  }, [id]);

  return (
    <Grid container sx={{ mt: "10px", flex: 1, alignItems: "top" }} spacing={1}>
      <Grid item xs={12} md={6} container>
        <Grid item xs={12} md={6}>
          <FormLabel>Booking No: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking?.bookingNo}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Freight: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking?.freight}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Operation: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking?.operation}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Shipment Type: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking?.shipmentType}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Shipper: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.shipper &&
              currentBooking.shipper?.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Consignee: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.consignee &&
              currentBooking.consignee.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Notifier: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.notifier &&
              currentBooking.notifier.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Line: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.line && currentBooking.line.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Transporter: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.transporter &&
              currentBooking.transporter.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>CHA: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.CHA && currentBooking.CHA.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Overseas Agent: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.overseasAgent &&
              currentBooking.overseasAgent.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Delivery Agent: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.deliveryAgent &&
              currentBooking.deliveryAgent.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>POL: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.pol &&
              currentBooking.pol.portName}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>POD: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.pod &&
              currentBooking.pod.portName}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Final Destination: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.finalDestination}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>BL #: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.blNo}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>BL Type: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.blType}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>MBL Terms: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.mblTerms}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>HBL Terms: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.hblTerms}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Commodity: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking &&
              currentBooking.commodity &&
              currentBooking.commodity.commodityName}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Vessel: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.vessel}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Voyage: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.voyage}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel># of Packages: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.noOfPackages}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Gross Wt: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.grossWt}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Net Wt: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.netWt}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>CBM: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.cbm}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>ExRate: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.exrate}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Our Ref #: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.ourRefNo}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Description: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel>Remarks: </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {currentBooking && currentBooking.remarks}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Container Details</Typography>
        </Grid>
        {currentBooking?.containers &&
          currentBooking.containers.length > 0 &&
          currentBooking.containers.map(
            (containerDetails: any, index: number) => (
              <Grid item xs={12} key={containerDetails.containerNo}>
                <Typography variant="body1">
                  {index + 1}) {containerDetails.containerNo} -{" "}
                  {containerDetails.containerType} -{" "}
                  {containerDetails.noOfPackages} - {containerDetails.grossWt} -{" "}
                  {containerDetails.netWt} - {containerDetails.cbm}
                </Typography>
              </Grid>
            )
          )}

        <Grid item xs={12}>
          <Typography variant="h6">Vessel Schedule</Typography>
        </Grid>
        {currentBooking?.vesselSchedule &&
          currentBooking.vesselSchedule.length > 0 &&
          currentBooking.vesselSchedule.map((schedule: any, index: number) => (
            <Grid item xs={12} key={schedule.vesselName}>
              <Typography variant="body1">
                {index + 1}) {schedule.vesselName} - {schedule.voyage} -{" "}
                {schedule.portFrom} - {schedule.ETD} - {schedule.portTo} -{" "}
                {schedule.ETA}
              </Typography>
            </Grid>
          ))}

        <Grid item xs={12}>
          <Typography variant="h6">Sell Rate</Typography>
        </Grid>
        {currentBooking?.sellRate &&
          currentBooking.sellRate.length > 0 &&
          currentBooking.sellRate.map((rate: any, index: number) => (
            <Grid item xs={12} key={rate.narration._id}>
              <Typography variant="body1">
                {index + 1}) {rate.narration.billHeadName} - {rate.basis} - {rate.qty} -{" "}
                {rate.currency} - {rate.unitRate} - {rate.exRate} -{" "}
                {rate.amount}
              </Typography>
            </Grid>
          ))}

        <Grid item xs={12}>
          <Typography variant="h6">Buy Rate</Typography>
        </Grid>
        {currentBooking?.buyRate &&
          currentBooking.buyRate.length > 0 &&
          currentBooking.buyRate.map((rate: any, index: number) => (
            <Grid item xs={12}>
              <Typography variant="body1" key={rate.narration._id}>
                {index + 1}) {rate.narration.billHeadName} - {rate.basis} - {rate.qty} -{" "}
                {rate.currency} - {rate.unitRate} - {rate.exrate} - {" "}
                {rate.amount}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default ViewBooking;
