import { authActions } from "../Reducers/AuthReducer";
import Api from "../../Services";

export const loginUser = (credentials: any) => {
  return async (dispatch: any) => {
    try {
      Api("users/login", "POST", credentials)
        .then(async (result: any) => {
          if (result) {
            if (result.status) {
              await dispatch(
                authActions.loginSuccess({
                  ...result.data,
                })
              );

              await dispatch(
                authActions.setStatus({
                  statusType: "success",
                  message: "Login Successful!",
                })
              );
            } else {
              await dispatch(
                authActions.setStatus({
                  statusType: "error",
                  message: "Login failed! " + result.message,
                })
              );
            }
          } else {
            await dispatch(
              authActions.setStatus({
                statusType: "error",
                message: "Login failed! ",
              })
            );
          }
        })
        .catch(async (error) => {
          await dispatch(
            authActions.setStatus({
              statusType: "error",
              message: "Login failed: " + error,
            })
          );
        });
    } catch (error) {
      console.log("error on login ===> ", error);
      //dispatch
      await dispatch(
        authActions.setStatus({
          statusType: "error",
          message: "login failed! Please Try again",
        })
      );
    }
  };
};
