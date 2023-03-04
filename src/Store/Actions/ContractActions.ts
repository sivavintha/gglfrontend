import { spinnerActions } from "../Reducers/SpinnerReducer";
import Api from "../../Services";
import { TContract } from "../../Types";
import { contractActions } from "../Reducers/ContractReducer";

export const getContracts = (hideMessage?: boolean) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));
    Api("contracts/all", "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            contractActions.fetchContracts({
              contracts: result.data,
            })
          );
          !hideMessage &&
            (await dispatch(
              contractActions.setStatus({
                statusType: "success",
                message: "Contract fetched successfully!",
              })
            ));
        } else {
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Contract fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          contractActions.setStatus({
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

export const getContractById = (contractId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("contracts/" + contractId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            contractActions.fetchContractById({
              contract: result.data,
            })
          );
        } else {
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Contract fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          contractActions.setStatus({
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

export const addNewContract = (contract: TContract) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("contracts/create", "POST", contract, "", true)
      .then(async (result: any) => {
        if (result.status) {
          await dispatch(contractActions.setLastSavedRecord(result.data));
          await dispatch(getContracts(true));
          await dispatch(
            contractActions.setStatus({
              statusType: "success",
              message: "Added successfully!",
            })
          );
        } else {
          await dispatch(contractActions.setLastSavedRecord(null));
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Failed! " + result.message,
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(contractActions.setLastSavedRecord(null));
        await dispatch(
          contractActions.setStatus({
            statusType: "error",
            message: "Contract adding failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const updateContract = (contract: TContract) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("contracts/update", "PUT", contract, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getContracts(true));
          await dispatch(
            contractActions.setStatus({
              statusType: "success",
              message: "Contract updated successfully!",
            })
          );
        } else {
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Contract updation failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          contractActions.setStatus({
            statusType: "error",
            message: "Contract updation failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const deleteContractById = (contractId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("contracts/" + contractId, "DELETE", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(getContracts(true));
          await dispatch(
            contractActions.setStatus({
              statusType: "success",
              message: "Contract deleted successfully!",
            })
          );
        } else {
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Contract deletion failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          contractActions.setStatus({
            statusType: "error",
            message: "Contract deletion failed! error = " + error,
          })
        );
      })
      .finally(() => {
        dispatch(spinnerActions.setLoading(false));
      });
  };
};

export const printContractById = (contractId: string) => {
  return async (dispatch: any) => {
    dispatch(spinnerActions.setLoading(true));

    Api("contracts/" + contractId, "GET", {}, "", true)
      .then(async (result: any) => {
        if (result) {
          await dispatch(
            contractActions.setPrintContract({
              contract: result.data,
            })
          );
        } else {
          await dispatch(
            contractActions.setStatus({
              statusType: "error",
              message: "Contract fetching failed!",
            })
          );
        }
      })
      .catch(async (error) => {
        await dispatch(
          contractActions.setStatus({
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
