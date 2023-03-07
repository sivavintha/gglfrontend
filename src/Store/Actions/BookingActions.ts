import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TBooking } from "../../Types";
import { bookingActions } from "../Reducers/BookingReducer";

export const getBookings = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("booking/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            bookingActions.fetchBookings({
              bookings: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              bookingActions.setStatus({
                statusType: "success",
                message: "Booking fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            bookingActions.setStatus({
              statusType: "error",
              message: "Booking fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          bookingActions.setStatus({
            statusType: "error",
            message: "Booking fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getBookingById = (bookingId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("booking/" + bookingId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            bookingActions.fetchBookingById({
              booking: result.data,
            })
          );
        } else {
          await dispatch(
            bookingActions.setStatus({
              statusType: "error",
              message: "Booking fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          bookingActions.setStatus({
            statusType: "error",
            message: "Booking fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewBooking = (booking: TBooking) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("booking/create", "POST", booking, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getBookings(true));
          await dispatch(
            bookingActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            bookingActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          bookingActions.setStatus({
            statusType: "error",
            message: "Booking adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateBooking = (booking: TBooking) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("booking/update", "PUT", booking, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBookings(true));
          await dispatch(
            bookingActions.setStatus({
              statusType: "success",
              message: "Booking updated successfully!",
            })
          );
        } else {
          await dispatch(
            bookingActions.setStatus({
              statusType: "error",
              message: "Booking updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          bookingActions.setStatus({
            statusType: "error",
            message: "Booking updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteBookingById = (bookingId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("booking/" + bookingId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBookings(true));
          await dispatch(
            bookingActions.setStatus({
              statusType: "success",
              message: "Booking deleted successfully!",
            })
          );
        } else {
          await dispatch(
            bookingActions.setStatus({
              statusType: "error",
              message: "Booking deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          bookingActions.setStatus({
            statusType: "error",
            message: "Booking deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
