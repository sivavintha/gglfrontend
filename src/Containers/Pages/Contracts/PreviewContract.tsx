import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintContract from "./PrintContract";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { printContractById } from "../../../Store/Actions/ContractActions";

interface IPreviewContract {
  id: string;
}

const PreviewContract: React.FC<IPreviewContract> = ({ id }) => {
  const dispatch = useAppDispatch();

  const printContract = useAppSelector(
    (state) => state.contract.printContract
  );

  React.useEffect(() => {
    if (id) {
      dispatch(printContractById(id));
    }
  }, [id]);

  return (
    printContract && (
      <PDFViewer style={{ flex: 1 }} width="100%" height="600px">
        <PrintContract contract={printContract} />
      </PDFViewer>
    )
  );
};

export default PreviewContract;
