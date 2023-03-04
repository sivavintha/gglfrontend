import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TGST } from "../../Types";
import { gstActions } from "../Reducers/GSTReducer";

export const getGST = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("gst/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            gstActions.fetchGST({
              gst: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              gstActions.setStatus({
                statusType: "success",
                message: "GST fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            gstActions.setStatus({
              statusType: "error",
              message: "GST fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          gstActions.setStatus({
            statusType: "error",
            message: "GST fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getGSTById = (gstId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("gst/" + gstId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            gstActions.fetchGSTById({
              gst: result.data,
            })
          );
        } else {
          await dispatch(
            gstActions.setStatus({
              statusType: "error",
              message: "GST fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          gstActions.setStatus({
            statusType: "error",
            message: "GST fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewGST = (gst: TGST) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("gst/create", "POST", gst, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getGST(true));
          await dispatch(
            gstActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            gstActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          gstActions.setStatus({
            statusType: "error",
            message: "GST adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateGST = (gst: TGST) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("gst/update", "PUT", gst, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getGST(true));
          await dispatch(
            gstActions.setStatus({
              statusType: "success",
              message: "GST updated successfully!",
            })
          );
        } else {
          await dispatch(
            gstActions.setStatus({
              statusType: "error",
              message: "GST updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          gstActions.setStatus({
            statusType: "error",
            message: "GST updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteGSTById = (gstId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("gst/" + gstId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getGST(true));
          await dispatch(
            gstActions.setStatus({
              statusType: "success",
              message: "GST deleted successfully!",
            })
          );
        } else {
          await dispatch(
            gstActions.setStatus({
              statusType: "error",
              message: "GST deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          gstActions.setStatus({
            statusType: "error",
            message: "GST deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
