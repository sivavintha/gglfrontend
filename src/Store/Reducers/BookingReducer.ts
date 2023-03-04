import { createSlice } from "@reduxjs/toolkit";
import { IBookingState } from "../../Interfaces";
import { TBooking } from "../../Types";

const initialState: IBookingState = {
  bookings: [],
  filteredBookings: [],
  currentBooking: null,
  status: null,
};

const bookingReducer = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    fetchBookings(state, action) {
      state.bookings = [...action.payload.bookings];
    },
    fetchBookingById(state, action) {
      state.currentBooking = action.payload.booking;
    },
    searchBooking(state, action) {
      let AllBookings = [...state.bookings];
      let searchedBookings: TBooking[] = [];

      searchedBookings = AllBookings.filter((booking) =>
        Object.values(booking).some((val) =>
          val?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      state.filteredBookings = searchedBookings;
    },
    setStatus(state, action) {
      state.status = {
        type: action.payload.statusType,
        message: action.payload.message,
      };
    },
  },
});

export const bookingActions = bookingReducer.actions;

export default bookingReducer;
