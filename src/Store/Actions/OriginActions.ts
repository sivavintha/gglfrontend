import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TOrigin } from "../../Types";
import { originActions } from "../Reducers/OriginReducer";

export const getOrigin = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("origin/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            originActions.fetchOrigin({
              origin: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              originActions.setStatus({
                statusType: "success",
                message: "Origin fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            originActions.setStatus({
              statusType: "error",
              message: "Origin fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          originActions.setStatus({
            statusType: "error",
            message: "Origin fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getOriginById = (originId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("origin/" + originId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            originActions.fetchOriginById({
              origin: result.data,
            })
          );
        } else {
          await dispatch(
            originActions.setStatus({
              statusType: "error",
              message: "Origin fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          originActions.setStatus({
            statusType: "error",
            message: "Origin fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewOrigin = (origin: TOrigin) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("origin/create", "POST", origin, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getOrigin(true));
          await dispatch(
            originActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            originActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          originActions.setStatus({
            statusType: "error",
            message: "Origin adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateOrigin = (origin: TOrigin) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("origin/update", "PUT", origin, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getOrigin(true));
          await dispatch(
            originActions.setStatus({
              statusType: "success",
              message: "Origin updated successfully!",
            })
          );
        } else {
          await dispatch(
            originActions.setStatus({
              statusType: "error",
              message: "Origin updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          originActions.setStatus({
            statusType: "error",
            message: "Origin updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteOriginById = (originId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("origin/" + originId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getOrigin(true));
          await dispatch(
            originActions.setStatus({
              statusType: "success",
              message: "Origin deleted successfully!",
            })
          );
        } else {
          await dispatch(
            originActions.setStatus({
              statusType: "error",
              message: "Origin deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          originActions.setStatus({
            statusType: "error",
            message: "Origin deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
