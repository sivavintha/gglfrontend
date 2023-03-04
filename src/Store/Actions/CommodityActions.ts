import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TCommodity } from "../../Types";
import { commodityActions } from "../Reducers/CommodityReducer";

export const getCommodity = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("commodity/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            commodityActions.fetchCommodity({
              commodity: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              commodityActions.setStatus({
                statusType: "success",
                message: "Commodity fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            commodityActions.setStatus({
              statusType: "error",
              message: "Commodity fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          commodityActions.setStatus({
            statusType: "error",
            message: "Commodity fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getCommodityById = (commodityId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodity/" + commodityId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            commodityActions.fetchCommodityById({
              commodity: result.data,
            })
          );
        } else {
          await dispatch(
            commodityActions.setStatus({
              statusType: "error",
              message: "Commodity fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          commodityActions.setStatus({
            statusType: "error",
            message: "Commodity fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewCommodity = (commodity: TCommodity) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodity/create", "POST", commodity, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getCommodity(true));
          await dispatch(
            commodityActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            commodityActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          commodityActions.setStatus({
            statusType: "error",
            message: "Commodity adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateCommodity = (commodity: TCommodity) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodity/update", "PUT", commodity, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getCommodity(true));
          await dispatch(
            commodityActions.setStatus({
              statusType: "success",
              message: "Commodity updated successfully!",
            })
          );
        } else {
          await dispatch(
            commodityActions.setStatus({
              statusType: "error",
              message: "Commodity updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          commodityActions.setStatus({
            statusType: "error",
            message: "Commodity updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteCommodityById = (commodityId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("commodity/" + commodityId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getCommodity(true));
          await dispatch(
            commodityActions.setStatus({
              statusType: "success",
              message: "Commodity deleted successfully!",
            })
          );
        } else {
          await dispatch(
            commodityActions.setStatus({
              statusType: "error",
              message: "Commodity deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          commodityActions.setStatus({
            statusType: "error",
            message: "Commodity deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
