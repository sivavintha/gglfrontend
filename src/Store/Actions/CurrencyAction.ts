import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TCurrency } from "../../Types";
import { currencyActions } from "../Reducers/CurrencyReducer";

export const getCurrency = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("currency/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            currencyActions.fetchCurrency({
              currency: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              currencyActions.setStatus({
                statusType: "success",
                message: "Currency fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            currencyActions.setStatus({
              statusType: "error",
              message: "Currency fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          currencyActions.setStatus({
            statusType: "error",
            message: "Currency fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getCurrencyById = (currencyId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("currency/" + currencyId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            currencyActions.fetchCurrencyById({
              currency: result.data,
            })
          );
        } else {
          await dispatch(
            currencyActions.setStatus({
              statusType: "error",
              message: "Currency fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          currencyActions.setStatus({
            statusType: "error",
            message: "Currency fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewCurrency = (currency: TCurrency) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("currency/create", "POST", currency, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getCurrency(true));
          await dispatch(
            currencyActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            currencyActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          currencyActions.setStatus({
            statusType: "error",
            message: "Currency adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateCurrency = (currency: TCurrency) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("currency/update", "PUT", currency, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getCurrency(true));
          await dispatch(
            currencyActions.setStatus({
              statusType: "success",
              message: "Currency updated successfully!",
            })
          );
        } else {
          await dispatch(
            currencyActions.setStatus({
              statusType: "error",
              message: "Currency updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          currencyActions.setStatus({
            statusType: "error",
            message: "Currency updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteCurrencyById = (currencyId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("currency/" + currencyId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getCurrency(true));
          await dispatch(
            currencyActions.setStatus({
              statusType: "success",
              message: "Currency deleted successfully!",
            })
          );
        } else {
          await dispatch(
            currencyActions.setStatus({
              statusType: "error",
              message: "Currency deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          currencyActions.setStatus({
            statusType: "error",
            message: "Currency deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
