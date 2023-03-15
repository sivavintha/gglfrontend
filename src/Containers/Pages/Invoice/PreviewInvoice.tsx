import React, { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PrintContract from "./PrintInvoice";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { printInvoiceById } from "../../../Store/Actions/InvoiceActions";

interface IPreviewInvoice {
  id: string;
}

const PreviewInvoice: React.FC<IPreviewInvoice> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [invoiceData, setInvoiceData] = useState<any>();

  const printInvoice: any = useAppSelector(
    (state) => state.invoice.printInvoice
  );

  React.useEffect(() => {
    if (id) {
      dispatch(printInvoiceById(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (printInvoice && printInvoice.bookingNo) {
      let formattedString = "";
      let containers;
      if (
        printInvoice.bookingNo.containers &&
        printInvoice.bookingNo.containers.length > 0
      ) {
        let bookingCount = printInvoice.bookingNo.containers.reduce(function (
          allNames: any,
          obj: any
        ) {
          if (obj.containerType in allNames) {
            allNames[obj.containerType]++;
          } else {
            allNames[obj.containerType] = 1;
          }
          return allNames;
        },
        {});

        for (let containerType in bookingCount) {
          formattedString += `${containerType}: ${bookingCount[containerType]}`;
          console.log(`${containerType}: ${bookingCount[containerType]}, `);
        }
        console.log("bookingCount ===", formattedString);

        containers = printInvoice.bookingNo.containers.map(
          (item: any) => item.containerNo
        );
        console.log("containers ===", containers ? containers.join(", ") : []);
      }
      //rates calculation
      let partyRates;
      let rates;
      let totalAmount = 0;
      let cgst = 0,
        sgst = 0,
        igst = 0;
      if (printInvoice.invoiceCategory === "CUSTOMER") {
        rates = [...printInvoice.bookingNo.sellRate];
      } else {
        rates = [...printInvoice.bookingNo.buyRate];
      }

      partyRates = [
        ...rates.filter(
          (rate) => rate.billingTo._id === printInvoice.billingParty._id
        ),
      ];

      let newArray = partyRates.map((rate) => {
        const newObj = { ...rate };
        newObj["cgstSlab"] =
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? rate.narration.gstSlab.cgst
            : "";
        newObj.sgstSlab =
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? rate.narration.gstSlab.sgst
            : "";
        newObj.igstSlab =
          rate.billingTo.stateTin !== "33" && rate.narration.gstApplicable
            ? rate.narration.gstSlab.igst
            : "";
        newObj.cgst =
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.cgst) /
              100
            : 0;
        newObj.sgst =
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.sgst) /
              100
            : 0;
        newObj.igst =
          rate.billingTo.stateTin !== "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.igst) /
              100
            : 0;
        totalAmount += rate.amount;
        cgst +=
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.cgst) /
              100
            : 0;
        console.log(
          "cgst calc ===<",
          rate.billingTo.stateTin,
          rate.narration.gstApplicable,
          rate.amount * rate.qty * rate.exrate * rate.narration.gstSlab.cgst
        );

        sgst +=
          rate.billingTo.stateTin === "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.sgst) /
              100
            : 0;
        igst +=
          rate.billingTo.stateTin !== "33" && rate.narration.gstApplicable
            ? (rate.amount *
                rate.qty *
                rate.exrate *
                rate.narration.gstSlab.igst) /
              100
            : 0;
        console.log("newObj ===.", newObj);
        return newObj;
      });
      console.log("partyRates ===>", partyRates);

      // let newArray = [...partyRates]

      console.log("newArray ===>", newArray);
      const emptyRow = new Array(10 - partyRates.length).fill(null);
      const invoiceData = { ...printInvoice };
      invoiceData.bookingCount = formattedString;
      invoiceData.containersForPrint = containers ? containers.join(", ") : [];
      invoiceData.rates = rates;
      invoiceData.emptyRow = emptyRow;
      invoiceData.totalAmount = totalAmount;
      invoiceData.totalCGST = cgst;
      invoiceData.totalSGST = sgst;
      invoiceData.totalIGST = igst;
      invoiceData.partyRates = newArray;

      console.log("emptyRow ===>", emptyRow);
      console.log("totalAmount ===>", totalAmount);
      console.log("cgst ===>", cgst, " sgst===? ", sgst, " igst===> ", igst);

      setInvoiceData(invoiceData);
    }
  }, [printInvoice]);

  return (
    invoiceData && (
      <PDFViewer style={{ flex: 1 }} width="100%" height="600px">
        <PrintContract invoice={invoiceData} />
      </PDFViewer>
    )
  );
};

export default PreviewInvoice;
