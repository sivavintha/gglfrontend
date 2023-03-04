import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TEvent } from "../../Types";
import { eventActions } from "../Reducers/EventReducer";

export const getEvent = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("commodities/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            eventActions.fetchEvent({
              event: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              eventActions.setStatus({
                statusType: "success",
                message: "Event fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            eventActions.setStatus({
              statusType: "error",
              message: "Event fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          eventActions.setStatus({
            statusType: "error",
            message: "Event fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getEventById = (eventId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodities/" + eventId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            eventActions.fetchEventById({
              event: result.data,
            })
          );
        } else {
          await dispatch(
            eventActions.setStatus({
              statusType: "error",
              message: "Event fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          eventActions.setStatus({
            statusType: "error",
            message: "Event fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewEvent = (event: TEvent) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodities/create", "POST", event, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getEvent(true));
          await dispatch(
            eventActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            eventActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          eventActions.setStatus({
            statusType: "error",
            message: "Event adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateEvent = (event: TEvent) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodities/update", "PUT", event, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getEvent(true));
          await dispatch(
            eventActions.setStatus({
              statusType: "success",
              message: "Event updated successfully!",
            })
          );
        } else {
          await dispatch(
            eventActions.setStatus({
              statusType: "error",
              message: "Event updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          eventActions.setStatus({
            statusType: "error",
            message: "Event updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteEventById = (eventId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodities/" + eventId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getEvent(true));
          await dispatch(
            eventActions.setStatus({
              statusType: "success",
              message: "Event deleted successfully!",
            })
          );
        } else {
          await dispatch(
            eventActions.setStatus({
              statusType: "error",
              message: "Event deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          eventActions.setStatus({
            statusType: "error",
            message: "Event deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
