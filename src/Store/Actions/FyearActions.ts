import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TFyear } from "../../Types";
import { fyearActions } from "../Reducers/FyearReducer";

export const getFyear = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("fyear/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            fyearActions.fetchFyear({
              fyears: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              fyearActions.setStatus({
                statusType: "success",
                message: "Fyear fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            fyearActions.setStatus({
              statusType: "error",
              message: "Fyear fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          fyearActions.setStatus({
            statusType: "error",
            message: "Fyear fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getFyearById = (fyearId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("fyear/" + fyearId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            fyearActions.fetchFyearById({
              fyear: result.data,
            })
          );
        } else {
          await dispatch(
            fyearActions.setStatus({
              statusType: "error",
              message: "Fyear fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          fyearActions.setStatus({
            statusType: "error",
            message: "Fyear fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewFyear = (fyear: TFyear) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("fyear/create", "POST", fyear, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getFyear(true));
          await dispatch(
            fyearActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            fyearActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          fyearActions.setStatus({
            statusType: "error",
            message: "Fyear adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateFyear = (fyear: TFyear) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("fyear/update", "PUT", fyear, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getFyear(true));
          await dispatch(
            fyearActions.setStatus({
              statusType: "success",
              message: "Fyear updated successfully!",
            })
          );
        } else {
          await dispatch(
            fyearActions.setStatus({
              statusType: "error",
              message: "Fyear updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          fyearActions.setStatus({
            statusType: "error",
            message: "Fyear updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteFyearById = (fyearId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("fyear/" + fyearId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getFyear(true));
          await dispatch(
            fyearActions.setStatus({
              statusType: "success",
              message: "Fyear deleted successfully!",
            })
          );
        } else {
          await dispatch(
            fyearActions.setStatus({
              statusType: "error",
              message: "Fyear deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          fyearActions.setStatus({
            statusType: "error",
            message: "Fyear deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
