import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TInvoice } from "../../Types";
import { invoiceActions } from "../Reducers/InvoiceReducer";

export const getInvoices = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("invoice/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            invoiceActions.fetchInvoices({
              invoices: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              invoiceActions.setStatus({
                statusType: "success",
                message: "Invoice fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Invoice fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          invoiceActions.setStatus({
            statusType: "error",
            message: "Invoice fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getInvoiceById = (invoiceId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("invoice/" + invoiceId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            invoiceActions.fetchInvoiceById({
              invoice: result.data,
            })
          );
        } else {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Invoice fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          invoiceActions.setStatus({
            statusType: "error",
            message: "Invoice fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewInvoice = (invoice: TInvoice) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("invoice/create", "POST", invoice, "", true)
      .then(async (result: any) => {
        if (result.status) {
          const invoiceNo = result.data.invoiceNo || "";
          await dispatch(getInvoices(true));
          await dispatch(
            invoiceActions.setStatus({
              statusType: "success",
              message: `Invoice ${invoiceNo} Added successfully!`,
            })
          );
        } else {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          invoiceActions.setStatus({
            statusType: "error",
            message: "Invoice adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateInvoice = (invoice: any, type: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    let url = "invoice/update";
    if (type === "GENERAL") {
      url += "/general";
    } else if (type === "SCHEDULE") {
      url += "/schedule";
    } else if (type === "RATES") {
      url += "/rates";
    } else if (type === "CONTAINER") {
      url += "/container";
    } else if (type === "EVENTS") {
      url += "/events";
    }

    Api(url, "PUT", invoice, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getInvoices(true));
          await dispatch(
            invoiceActions.setStatus({
              statusType: "success",
              message: "Invoice updated successfully!",
            })
          );
        } else {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Invoice updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          invoiceActions.setStatus({
            statusType: "error",
            message: "Invoice updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteInvoiceById = (invoiceId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("invoice/" + invoiceId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getInvoices(true));
          await dispatch(
            invoiceActions.setStatus({
              statusType: "success",
              message: "Invoice deleted successfully!",
            })
          );
        } else {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Invoice deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          invoiceActions.setStatus({
            statusType: "error",
            message: "Invoice deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const printInvoiceById = (invoiceId: string) => {
    return async (dispatch: any) => {
      dispatch(spinnerActions.setLoading(true));
  
      Api("invoice/" + invoiceId, "GET", {}, "", true)
        .then(async (result: any) => {
          if (result) {
            await dispatch(
              invoiceActions.setPrintInvoice({
                contract: result.data,
              })
            );
          } else {
            await dispatch(
                invoiceActions.setStatus({
                statusType: "error",
                message: "Contract fetching failed!",
              })
            );
          }
        })
        .catch(async (error) => {
          await dispatch(
            invoiceActions.setStatus({
              statusType: "error",
              message: "Contract fetching failed: " + error,
            })
          );
        })
        .finally(() => {
          dispatch(spinnerActions.setLoading(false));
        });
    };
  };