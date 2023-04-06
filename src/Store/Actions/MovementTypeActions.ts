import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TMovementType } from "../../Types";
import { movementTypeActions } from "../Reducers/MovementTypeReducer";

export const getMovementType = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("movementtype/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            movementTypeActions.fetchMovementType({
              movementType: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              movementTypeActions.setStatus({
                statusType: "success",
                message: "MovementType fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "error",
              message: "MovementType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          movementTypeActions.setStatus({
            statusType: "error",
            message: "MovementType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getMovementTypeById = (movementTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("movementtype/" + movementTypeId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            movementTypeActions.fetchMovementTypeById({
              movementType: result.data,
            })
          );
        } else {
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "error",
              message: "MovementType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          movementTypeActions.setStatus({
            statusType: "error",
            message: "MovementType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewMovementType = (movementType: TMovementType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("movementtype/create", "POST", movementType, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getMovementType(true));
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          movementTypeActions.setStatus({
            statusType: "error",
            message: "MovementType adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateMovementType = (movementType: TMovementType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("movementtype/update", "PUT", movementType, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getMovementType(true));
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "success",
              message: "MovementType updated successfully!",
            })
          );
        } else {
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "error",
              message: "MovementType updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          movementTypeActions.setStatus({
            statusType: "error",
            message: "MovementType updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteMovementTypeById = (movementTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("movementtype/" + movementTypeId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getMovementType(true));
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "success",
              message: "MovementType deleted successfully!",
            })
          );
        } else {
          await dispatch(
            movementTypeActions.setStatus({
              statusType: "error",
              message: "MovementType deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          movementTypeActions.setStatus({
            statusType: "error",
            message: "MovementType deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
