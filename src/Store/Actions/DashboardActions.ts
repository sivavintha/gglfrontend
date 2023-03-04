import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { dashboardActions } from "../Reducers/DashboardReducer";

export const getDashboard = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("dashboard/", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            dashboardActions.fetchDashboard({
              dashboard: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              dashboardActions.setStatus({
                statusType: "success",
                message: "Dashboard fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            dashboardActions.setStatus({
              statusType: "error",
              message: "Dashboard fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          dashboardActions.setStatus({
            statusType: "error",
            message: "Dashboard fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
