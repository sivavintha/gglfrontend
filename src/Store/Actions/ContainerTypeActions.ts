import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TContainerType } from "../../Types";
import { containerTypeActions } from "../Reducers/ContainerTypeReducer";

export const getContainerType = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("containertype/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            containerTypeActions.fetchContainerType({
              containerType: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              containerTypeActions.setStatus({
                statusType: "success",
                message: "ContainerType fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "error",
              message: "ContainerType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          containerTypeActions.setStatus({
            statusType: "error",
            message: "ContainerType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getContainerTypeById = (containerTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("containertype/" + containerTypeId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            containerTypeActions.fetchContainerTypeById({
              containerType: result.data,
            })
          );
        } else {
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "error",
              message: "ContainerType fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          containerTypeActions.setStatus({
            statusType: "error",
            message: "ContainerType fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewContainerType = (containerType: TContainerType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("containertype/create", "POST", containerType, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getContainerType(true));
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          containerTypeActions.setStatus({
            statusType: "error",
            message: "ContainerType adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateContainerType = (containerType: TContainerType) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("containertype/update", "PUT", containerType, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getContainerType(true));
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "success",
              message: "ContainerType updated successfully!",
            })
          );
        } else {
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "error",
              message: "ContainerType updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          containerTypeActions.setStatus({
            statusType: "error",
            message: "ContainerType updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteContainerTypeById = (containerTypeId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("containertype/" + containerTypeId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getContainerType(true));
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "success",
              message: "ContainerType deleted successfully!",
            })
          );
        } else {
          await dispatch(
            containerTypeActions.setStatus({
              statusType: "error",
              message: "ContainerType deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          containerTypeActions.setStatus({
            statusType: "error",
            message: "ContainerType deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
