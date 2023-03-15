import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TBasisType } from "../../Types";
import { basisTypeActions } from "../Reducers/BasisTypeReducer";

export const getBasisType = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("basistype/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            basisTypeActions.fetchBasisType({
              basisType: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              basisTypeActions.setStatus({
                statusType: "success",
                message: "BasisType fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "error",
              message: "BasisType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          basisTypeActions.setStatus({
            statusType: "error",
            message: "BasisType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getBasisTypeById = (basisTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("basistype/" + basisTypeId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            basisTypeActions.fetchBasisTypeById({
              basisType: result.data,
            })
          );
        } else {
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "error",
              message: "BasisType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          basisTypeActions.setStatus({
            statusType: "error",
            message: "BasisType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewBasisType = (basisType: TBasisType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("basistype/create", "POST", basisType, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getBasisType(true));
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          basisTypeActions.setStatus({
            statusType: "error",
            message: "BasisType adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateBasisType = (basisType: TBasisType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("basistype/update", "PUT", basisType, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBasisType(true));
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "success",
              message: "BasisType updated successfully!",
            })
          );
        } else {
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "error",
              message: "BasisType updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          basisTypeActions.setStatus({
            statusType: "error",
            message: "BasisType updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteBasisTypeById = (basisTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("basistype/" + basisTypeId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getBasisType(true));
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "success",
              message: "BasisType deleted successfully!",
            })
          );
        } else {
          await dispatch(
            basisTypeActions.setStatus({
              statusType: "error",
              message: "BasisType deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          basisTypeActions.setStatus({
            statusType: "error",
            message: "BasisType deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
