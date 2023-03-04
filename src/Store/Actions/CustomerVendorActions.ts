import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TCustomerVendor } from "../../Types";
import { customerVendorActions } from "../Reducers/CustomerVendorReducer";

export const getCustomerVendors = (category: string, hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("customervendor/all/" + category, "GET", null, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            customerVendorActions.fetchCustomers({
              customers: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              customerVendorActions.setStatus({
                statusType: "success",
                message: "CustomerVendor fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "CustomerVendor fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "CustomerVendor fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getVendors = (category: string, hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("customervendor/all/" + category, "GET", null, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            customerVendorActions.fetchVendors({
              vendors: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              customerVendorActions.setStatus({
                statusType: "success",
                message: "Vendors fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "Customer fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "Customer fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const getCustomerVendorById = (customerVendorId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("customervendor/" + customerVendorId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            customerVendorActions.fetchCustomerVendorById({
              customerVendor: result.data,
            })
          );
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "CustomerVendor fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "CustomerVendor fetching failed: " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const addNewCustomerVendor = (customerVendor: TCustomerVendor) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("customervendor/create", "POST", customerVendor, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(getCustomerVendors(customerVendor.category, true));
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "CustomerVendor adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateCustomerVendor = (customerVendor: TCustomerVendor) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("customervendor/update", "PUT", customerVendor, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getCustomerVendors("CUSTOMER", true));
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "success",
              message: "CustomerVendor updated successfully!",
            })
          );
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "CustomerVendor updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "CustomerVendor updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteCustomerVendorById = (customerVendorId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("customervendor/" + customerVendorId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          console.log("result ===>", result);
          await dispatch(getCustomerVendors(result.data.category, true));
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "success",
              message: "CustomerVendor deleted successfully!",
            })
          );
        } else {
          await dispatch(
            customerVendorActions.setStatus({
              statusType: "error",
              message: "CustomerVendor deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          customerVendorActions.setStatus({
            statusType: "error",
            message: "CustomerVendor deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};
