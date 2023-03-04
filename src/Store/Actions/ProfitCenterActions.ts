import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TProfitCenter } from "../../Types";
import { profitCenterActions } from "../Reducers/ProfitCenterReducer";

export const getProfitCenter = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("profitcenter/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            profitCenterActions.fetchProfitCenter({
              profitCenters: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              profitCenterActions.setStatus({
                statusType: "success",
                message: "ProfitCenter fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "error",
              message: "ProfitCenter fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          profitCenterActions.setStatus({
            statusType: "error",
            message: "ProfitCenter fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getProfitCenterById = (profitCenterId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("profitcenter/" + profitCenterId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            profitCenterActions.fetchProfitCenterById({
              profitCenter: result.data,
            })
          );
        } else {
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "error",
              message: "ProfitCenter fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          profitCenterActions.setStatus({
            statusType: "error",
            message: "ProfitCenter fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewProfitCenter = (profitCenter: TProfitCenter) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("profitcenter/create", "POST", profitCenter, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getProfitCenter(true));
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          profitCenterActions.setStatus({
            statusType: "error",
            message: "ProfitCenter adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateProfitCenter = (profitCenter: TProfitCenter) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("profitcenter/update", "PUT", profitCenter, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getProfitCenter(true));
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "success",
              message: "ProfitCenter updated successfully!",
            })
          );
        } else {
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "error",
              message: "ProfitCenter updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          profitCenterActions.setStatus({
            statusType: "error",
            message: "ProfitCenter updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteProfitCenterById = (profitCenterId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("profitcenter/" + profitCenterId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getProfitCenter(true));
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "success",
              message: "ProfitCenter deleted successfully!",
            })
          );
        } else {
          await dispatch(
            profitCenterActions.setStatus({
              statusType: "error",
              message: "ProfitCenter deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          profitCenterActions.setStatus({
            statusType: "error",
            message: "ProfitCenter deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
