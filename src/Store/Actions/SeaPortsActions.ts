import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TSeaPorts } from "../../Types";
import { seaPortsActions } from "../Reducers/SeaPortsReducer";

export const getSeaPorts = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("seaports/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            seaPortsActions.fetchSeaPorts({
              seaPorts: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              seaPortsActions.setStatus({
                statusType: "success",
                message: "SeaPorts fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "error",
              message: "SeaPorts fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          seaPortsActions.setStatus({
            statusType: "error",
            message: "SeaPorts fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getSeaPortsById = (seaPortsId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("seaports/" + seaPortsId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            seaPortsActions.fetchSeaPortsById({
              seaPorts: result.data,
            })
          );
        } else {
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "error",
              message: "SeaPorts fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          seaPortsActions.setStatus({
            statusType: "error",
            message: "SeaPorts fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewSeaPorts = (seaPorts: TSeaPorts) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("seaports/create", "POST", seaPorts, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getSeaPorts(true));
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          seaPortsActions.setStatus({
            statusType: "error",
            message: "SeaPorts adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateSeaPorts = (seaPorts: TSeaPorts) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("seaports/update", "PUT", seaPorts, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getSeaPorts(true));
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "success",
              message: "SeaPorts updated successfully!",
            })
          );
        } else {
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "error",
              message: "SeaPorts updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          seaPortsActions.setStatus({
            statusType: "error",
            message: "SeaPorts updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteSeaPortsById = (seaPortsId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("seaports/" + seaPortsId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getSeaPorts(true));
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "success",
              message: "SeaPorts deleted successfully!",
            })
          );
        } else {
          await dispatch(
            seaPortsActions.setStatus({
              statusType: "error",
              message: "SeaPorts deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          seaPortsActions.setStatus({
            statusType: "error",
            message: "SeaPorts deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
