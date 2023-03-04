import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TBillHead } from "../../Types";
import { billHeadActions } from "../Reducers/BillHeadReducer";

export const getBillHeads = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("billhead/all", "GET", null, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            billHeadActions.fetchBillHeads({
              customers: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              billHeadActions.setStatus({
                statusType: "success",
                message: "BillHead fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            billHeadActions.setStatus({
              statusType: "error",
              message: "BillHead fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          billHeadActions.setStatus({
            statusType: "error",
            message: "BillHead fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getBillHeadById = (billHeadId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("billhead/" + billHeadId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            billHeadActions.fetchBillHeadById({
              billHead: result.data,
            })
          );
        } else {
          await dispatch(
            billHeadActions.setStatus({
              statusType: "error",
              message: "BillHead fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          billHeadActions.setStatus({
            statusType: "error",
            message: "BillHead fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewBillHead = (billHead: TBillHead) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("billhead/create", "POST", billHead, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getBillHeads(true));
          await dispatch(
            billHeadActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            billHeadActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          billHeadActions.setStatus({
            statusType: "error",
            message: "BillHead adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateBillHead = (billHead: TBillHead) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("billhead/update", "PUT", billHead, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBillHeads(true));
          await dispatch(
            billHeadActions.setStatus({
              statusType: "success",
              message: "BillHead updated successfully!",
            })
          );
        } else {
          await dispatch(
            billHeadActions.setStatus({
              statusType: "error",
              message: "BillHead updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          billHeadActions.setStatus({
            statusType: "error",
            message: "BillHead updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteBillHeadById = (billHeadId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("billhead/" + billHeadId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBillHeads(true));
          await dispatch(
            billHeadActions.setStatus({
              statusType: "success",
              message: "BillHead deleted successfully!",
            })
          );
        } else {
          await dispatch(
            billHeadActions.setStatus({
              statusType: "error",
              message: "BillHead deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          billHeadActions.setStatus({
            statusType: "error",
            message: "BillHead deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
