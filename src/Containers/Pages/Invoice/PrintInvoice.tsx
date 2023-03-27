import React, { useEffect } from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import moment from "moment";

// import logo from "../../../Assets/Images/logo.png";
import logo from "../../../Assets/Images/Grace.png";

//fonts
import Roboto from "../../../Assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "../../../Assets/fonts/Roboto/Roboto-Bold.ttf";

import Calibri from "../../../Assets/fonts/Calibri/calibri.ttf";
import CalibriBold from "../../../Assets/fonts/Calibri/calibrib.ttf";
import numberToWords from "number-to-words";
interface IPrintInvoice {
  invoice: any;
}

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: Roboto,
    },
    {
      src: RobotoBold,
      fontWeight: 600,
    },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-BoldItalic.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-Italic.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-Light.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-LightItalic.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-Meidum.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-MeidumItalic.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-Thin.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto/Roboto-ThinItalic.ttf",
    // },
    // {
    //   src: "../../../Assets/fonts/Roboto-Black.ttf",
    // },
    // {
    // src: "../../../Assets/fonts/Roboto/Roboto-BlackItalic.ttf",
    // },
  ],
  format: "truetype",
});

Font.register({
  family: "Calibri",
  fonts: [
    {
      src: Calibri,
    },
    {
      src: CalibriBold,
      fontWeight: 600,
    },
  ],
  format: "truetype",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: '#E4E4E4'
    fontFamily: "Calibri",
  },
  header: {
    margin: 10,
    fontSize: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    fontSize: "10px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
  },
  invoiceNoSection: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    fontSize: "12px",
    fontWeight: 600,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
  },
  containerSection: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    height: "30px",
  },
  billheadsSection: {
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 10,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    height: "40px",
  },
  billheadsContentSection: {
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 10,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: "130px",
    // border: 1,
    // borderColor: "red",
  },
  billingPartySection: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  bookingSection: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
  },
  contentSection: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    height: "300px",
  },
  textIndent: {
    padding: 2,
    paddingLeft: "20px",
  },
  bankDetails: {
    paddingLeft: "10px",
    display: "flex",
    flexDirection: "row",
  },
  headingText: {
    marginTop: "3px",
    paddingLeft: "20px",
    fontWeight: 600,
  },
  companyName: {
    marginTop: "3px",
    fontWeight: 600,
    textAlign: "center",
  },
  companyAddress: {
    marginTop: "3px",
    textAlign: "center",
  },
  commoditySection: {
    marginLeft: 20,
    marginRight: 20,
    padding: "10px",
    fontSize: "12px",
  },
  footer: {
    margin: "20px",
    marginBottom: "0px",
    fontSize: "10px",
  },
  textCenter: {
    textAlign: "center",
    padding: "2px",
  },
  signatureSection: {
    marginLeft: 20,
    marginRight: 20,
    // padding: 5,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  footerSection: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    fontSize: "8px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    height: "75px",
  },
  flexSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "space-between",
  },
  imageContainer: {
    // height: "120px",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: "black",
    padding: "10px",
    textAlign: "center",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "black",
    height: "290px",
  },
  totalConatiner: {
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 10,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: "80px",
    border: 1,
    // borderColor: "red",
  },
});

const PrintInvoice: React.FC<IPrintInvoice> = ({ invoice }) => {
  React.useEffect(() => {
    console.log("printinvoice data ===>", invoice);
  }, []);
  return (
    invoice && (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>{invoice.heading}</Text>
          </View>
          <View style={styles.invoiceNoSection}>
            <Text>
              INV #: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {invoice?.invoiceNo}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              INV DT: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {moment(invoice?.invoiceDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={styles.billingPartySection}>
            <div style={styles.flexSpaceBetween}>
              <div style={{ width: "300px" }}>
                <div
                  style={{
                    padding: "10px",
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    paddingBottom: 0,
                    height: "150px",
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>To: </Text>
                  <Text style={styles.headingText}>
                    {invoice.billingParty.name},
                  </Text>
                  {invoice.billingParty.address1 && (
                    <Text style={styles.textIndent}>
                      {invoice.billingParty.address1},
                    </Text>
                  )}
                  {invoice.billingParty.address2 && (
                    <Text style={styles.textIndent}>
                      {invoice.billingParty.address2},
                    </Text>
                  )}

                  {invoice.billingParty.zipcode && (
                    <Text style={styles.textIndent}>
                      {invoice.billingParty.city} {invoice.billingParty.state}
                      {invoice.billingParty.zipcode},
                    </Text>
                  )}
                  {invoice.billingParty.country && (
                    <Text style={styles.textIndent}>
                      {invoice.billingParty.country}
                    </Text>
                  )}

                  {invoice.billingParty.gstInNumber && (
                    <Text style={styles.textIndent}>
                      GSTIN: {invoice.billingParty.gstInNumber}
                    </Text>
                  )}
                </div>
                <div
                  style={{
                    padding: "10px",
                    paddingBottom: "0px",
                    // borderRightWidth: 1,
                    // borderRightStyle: "solid",
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Booking
                    </Text>
                    <Text>: {invoice.bookingNo.bookingNo}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Date:
                    </Text>
                    <Text>
                      {invoice.bookingNo && invoice.bookingNo.createdAt
                        ? ": " +
                          moment(invoice.bookingNo.createdAt).format(
                            "DD/MM/YYYY"
                          )
                        : ": "}
                    </Text>
                  </View>

                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Ref #
                    </Text>
                    <Text>
                      :{" "}
                      {invoice.bookingNo.ourRefNo
                        ? invoice.bookingNo.ourRefNo
                        : ""}
                    </Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      BL #
                    </Text>
                    <Text>: {invoice.bookingNo.blNo}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Port of Loading
                    </Text>
                    <Text>: {invoice.bookingNo.pol.portName}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Port of Discharge
                    </Text>
                    <Text>: {invoice.bookingNo.pod.portName}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Place of Delivery
                    </Text>
                    <Text>: {invoice.bookingNo.finalDestination}</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: 600, width: "100px" }}>
                      Vessel & Voyage
                    </Text>
                    <Text>
                      : {invoice.bookingNo.vessel} {invoice.bookingNo.voyage}
                    </Text>
                  </View>
                  {!invoice.isUSDInvoice && (
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ fontWeight: 600, width: "100px" }}>
                        ExRate
                      </Text>
                      <Text>
                        :{" "}
                        {invoice.bookingNo.exrate
                          ? invoice.bookingNo.exrate
                          : ""}
                      </Text>
                    </View>
                  )}
                  {invoice.isUSDInvoice && (
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ fontWeight: 600, width: "100px" }}>
                        Billing Currency:
                      </Text>
                      <Text>: USD</Text>
                    </View>
                  )}
                </div>
              </div>
              <div style={styles.imageContainer}>
                <div
                  style={{
                    height: "160px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={logo} style={{ width: "250px" }}></Image>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Text style={styles.companyName}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GRACE
                    GLOBAL LOGISTICS SOLUTIONS
                  </Text>

                  <Text style={styles.companyAddress}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    97G/4C/4, FIRST FLOOR, P.S.S JAYAM TOWERS
                  </Text>

                  <Text style={styles.companyAddress}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEACHERS
                    COLONY, PALAYMKOTTAI ROAD,
                  </Text>

                  <Text style={styles.companyAddress}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TUTICORIN
                    - 628008.
                  </Text>
                  <Text style={styles.companyAddress}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L:
                    0461 - 4069735, MOBILE: 9500771992
                  </Text>
                  <Text style={styles.companyAddress}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GST
                    #: 33AAZFG1463G1Z7
                  </Text>
                </div>
              </div>
            </div>
          </View>
          <View style={styles.containerSection}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: 600, width: "100px" }}>
                Containers
              </Text>
              <Text>
                : {invoice.containersForPrint ? invoice.containersForPrint : ""}
              </Text>
            </View>
          </View>
          <View style={styles.billheadsSection}>
            <div style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "30px",
                  borderRight: 0,
                  borderLeft: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text> SN </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "200px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>DESCRIPTION </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "30px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>QTY </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "75px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>BASIS </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "75px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>UNIT PRICE </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "30px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>CUR </Text>
              </View>
              <View
                style={{
                  border: 1,
                  borderStyle: "solid",
                  width: "100px",
                  borderRight: 0,
                  borderTop: 0,
                  textAlign: "center",
                  height: "40px",
                  paddingTop: "15px",
                  fontSize: "10px",
                }}
              >
                <Text>AMOUNT </Text>
              </View>
              {!invoice.isUSDInvoice && invoice.totalSGST !== 0 && (
                <View
                  style={{
                    border: 1,
                    borderStyle: "solid",
                    width: "100px",
                    borderRight: 0,
                    borderTop: 0,
                    textAlign: "center",
                    height: "40px",
                    paddingTop: "8px",
                    fontSize: "10px",
                  }}
                >
                  <Text>SGST </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderRight: 0,
                      borderTop: 0,
                      textAlign: "center",
                    }}
                  >
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        width: "20px",
                        paddingTop: "4px",
                      }}
                    >
                      <Text>% </Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        paddingTop: "4px",
                        width: "80px",
                      }}
                    >
                      <Text>AMOUNT </Text>
                    </View>
                  </View>
                </View>
              )}

              {!invoice.isUSDInvoice && invoice.totalCGST !== 0 && (
                <View
                  style={{
                    border: 1,
                    borderStyle: "solid",
                    width: "100px",
                    borderRight: 0,
                    borderTop: 0,
                    textAlign: "center",
                    height: "40px",
                    paddingTop: "8px",
                    fontSize: "10px",
                  }}
                >
                  <Text>CGST </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderRight: 0,
                      borderLeft: 0,
                      borderTop: 0,
                      textAlign: "center",
                      height: "40px",
                    }}
                  >
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        width: "20px",
                        paddingTop: "4px",
                      }}
                    >
                      <Text>% </Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        paddingTop: "4px",
                        width: "80px",
                      }}
                    >
                      <Text>AMOUNT </Text>
                    </View>
                  </View>
                </View>
              )}

              {!invoice.isUSDInvoice && invoice.totalIGST !== 0 && (
                <View
                  style={{
                    border: 1,
                    borderStyle: "solid",
                    width: "100px",
                    borderRight: 0,
                    borderTop: 0,
                    textAlign: "center",
                    height: "40px",
                    paddingTop: "8px",
                    fontSize: "10px",
                  }}
                >
                  <Text>IGST </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderRight: 0,
                      borderLeft: 0,
                      borderTop: 0,
                      textAlign: "center",
                      height: "40px",
                    }}
                  >
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        width: "20px",
                        paddingTop: "4px",
                      }}
                    >
                      <Text>% </Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                        textAlign: "center",
                        paddingTop: "4px",
                        width: "80px",
                      }}
                    >
                      <Text>AMOUNT </Text>
                    </View>
                  </View>
                </View>
              )}
            </div>
          </View>
          <View style={styles.billheadsContentSection}>
            {invoice.partyRates &&
              invoice.partyRates.length > 0 &&
              invoice.partyRates.map((rate: any, index: number) => (
                <div style={{ height: "13px" }} key={index}>
                  <div
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "26px"
                          : "23px",
                        border: 0,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontSize: "10px",
                      }}
                    >
                      <Text>{index + 1}</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        width: invoice.isUSDInvoice
                          ? "200px"
                          : invoice.totalIGST !== 0
                          ? "173px"
                          : "152px",
                        textAlign: "left",
                        // height: "30px",
                        // paddingTop: "5px",
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        fontSize: "10px",
                      }}
                    >
                      <Text>{rate.narration.billHeadName} </Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "26px"
                          : "23px",
                        textAlign: "right",
                        // height: "30px",
                        // paddingTop: "5px",
                        paddingRight: "5px",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>{rate.qty}</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "75px"
                          : invoice.totalIGST !== 0
                          ? "65px"
                          : "57px",
                        textAlign: "center",
                        // height: "30px",
                        // paddingTop: "5px",
                        paddingRight: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,

                        fontSize: "10px",
                      }}
                    >
                      <Text>{rate.basis} </Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "75px"
                          : invoice.totalIGST !== 0
                          ? "65px"
                          : "57px",
                        textAlign: "right",
                        // height: "30px",
                        // paddingTop: "5px",
                        paddingRight: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,

                        fontSize: "10px",
                      }}
                    >
                      <Text>{rate.unitRate}</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "25px"
                          : "22px",
                        textAlign: "center",
                        // height: "30px",
                        // paddingTop: "5px",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>{rate.currency}</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "110px"
                          : invoice.totalIGST !== 0
                          ? "87px"
                          : "77px",
                        textAlign: "right",
                        // height: "30px",
                        // paddingTop: "5px",
                        paddingRight: "5px",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>{rate.unitRate * rate.qty * rate.exrate} </Text>
                    </View>
                    {rate.sgst !== 0 && (
                      <>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            width: "16px",
                            // paddingTop: "5px",
                            fontSize: "10px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>{rate.sgstSlab}</Text>
                        </View>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            // paddingTop: "5px",
                            paddingRight: "5px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,

                            fontSize: "10px",
                            width: "60px",
                          }}
                        >
                          <Text>{rate.sgst}</Text>
                        </View>
                      </>
                    )}

                    {rate.cgst !== 0 && (
                      <>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            width: "16px",
                            // paddingTop: "5px",

                            fontSize: "10px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>{rate.cgstSlab}</Text>
                        </View>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            // paddingTop: "5px",
                            paddingRight: "5px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            fontSize: "10px",
                            width: "60px",
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>{rate.cgst}</Text>
                        </View>
                      </>
                    )}

                    {rate.igst !== 0 && (
                      <>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            width: "17px",
                            // paddingTop: "5px",

                            fontSize: "10px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>{rate.igstSlab}</Text>
                        </View>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            // paddingTop: "5px",
                            paddingRight: "5px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            fontSize: "10px",
                            width: "70px",
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>{rate.igst}</Text>
                        </View>
                      </>
                    )}
                  </div>
                </div>
              ))}
            {invoice.emptyRow &&
              invoice.emptyRow.length > 0 &&
              invoice.emptyRow.map((rate: any, index: number) => (
                <div style={{ height: "13px" }} key={index}>
                  <div
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "26px"
                          : "23px",
                        border: 0,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontSize: "10px",
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        width: invoice.isUSDInvoice
                          ? "200px"
                          : invoice.totalIGST !== 0
                          ? "173px"
                          : "152px",
                        textAlign: "left",
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        fontSize: "10px",
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "26px"
                          : "23px",
                        textAlign: "right",
                        paddingRight: "5px",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "75px"
                          : invoice.totalIGST !== 0
                          ? "65px"
                          : "57px",
                        textAlign: "center",
                        paddingRight: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,

                        fontSize: "10px",
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "75px"
                          : invoice.totalIGST !== 0
                          ? "65px"
                          : "57px",
                        textAlign: "right",
                        paddingRight: "5px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,

                        fontSize: "10px",
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.isUSDInvoice
                          ? "30px"
                          : invoice.totalIGST !== 0
                          ? "25px"
                          : "22px",
                        textAlign: "center",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    <View
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        width: invoice.totalIGST !== 0 ? "87px" : "77px",
                        textAlign: "right",
                        paddingRight: "5px",
                        fontSize: "10px",
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                      }}
                    >
                      <Text>&nbsp;&nbsp;</Text>
                    </View>
                    {!invoice.isUSDInvoice && (
                      <>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            width: invoice.totalIGST !== 0 ? "17px" : "16px",
                            fontSize: "10px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>&nbsp;&nbsp;</Text>
                        </View>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            paddingRight: "5px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,

                            fontSize: "10px",
                            width: "60px",
                          }}
                        >
                          <Text>&nbsp;&nbsp;</Text>
                        </View>
                      </>
                    )}

                    {!invoice.isUSDInvoice && invoice.totalIGST === 0 && (
                      <>
                        {" "}
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            width: "16px",

                            fontSize: "10px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>&nbsp;&nbsp;</Text>
                        </View>
                        <View
                          style={{
                            border: 1,
                            borderStyle: "solid",
                            textAlign: "right",
                            paddingRight: "5px",
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            fontSize: "10px",
                            width: "60px",
                            borderBottomWidth: 0,
                          }}
                        >
                          <Text>&nbsp;&nbsp;</Text>
                        </View>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </View>
          <View style={styles.totalConatiner}>
            {!invoice.isUSDInvoice && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: invoice.totalIGST !== 0 ? "200px" : "175px",
                    borderRight: 1,
                    borderBottom: 1,
                    padding: "5px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  <Text>TOTAL </Text>
                </div>

                <div
                  style={{
                    width: invoice.totalIGST !== 0 ? "268px" : "231px",
                    borderRight: 1,
                    borderBottom: 1,
                    padding: "5px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  <Text>{+invoice.totalAmount.toFixed(2)}</Text>
                </div>

                <div
                  style={{
                    width: "16px",
                    borderRight: 1,
                    borderBottom: 1,
                    padding: "5px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  <Text>&nbsp;&nbsp;</Text>
                </div>

                {invoice.totalSGST !== 0 && (
                  <>
                    <div
                      style={{
                        width: "57px",
                        borderRight: 1,
                        borderBottom: 1,
                        padding: "5px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      <Text>{+invoice.totalSGST.toFixed(2)}</Text>
                    </div>
                    <div
                      style={{
                        width: "16px",
                        borderRight: 1,
                        borderBottom: 1,
                        padding: "5px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      <Text></Text>
                    </div>
                  </>
                )}
                {invoice.totalCGST !== 0 && (
                  <div
                    style={{
                      width: "57px",
                      borderRight: 0,
                      borderBottom: 1,
                      padding: "5px",
                      textAlign: "right",
                      fontWeight: 600,
                    }}
                  >
                    <Text>{+invoice.totalCGST.toFixed(2)}</Text>
                  </div>
                )}
                {invoice.totalIGST !== 0 && (
                  <div
                    style={{
                      width: "70px",
                      borderRight: 0,
                      borderBottom: 1,
                      padding: "5px",
                      textAlign: "right",
                      fontWeight: 600,
                    }}
                  >
                    <Text>{+invoice.totalIGST.toFixed(2)}</Text>
                  </div>
                )}
              </div>
            )}
            {invoice.isUSDInvoice && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: invoice.totalIGST !== 0 ? "200px" : "175px",
                    borderRight: 0,
                    borderBottom: 1,
                    padding: "5px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  <Text> &nbsp;&nbsp;</Text>
                </div>
                <div
                  style={{
                    width: invoice.totalIGST !== 0 ? "354px" : "380px",
                    borderRight: 0,
                    borderBottom: 1,
                    padding: "5px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  <Text>&nbsp;&nbsp;</Text>
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  width: invoice.totalIGST !== 0 ? "200px" : "175px",
                  borderRight: 1,
                  borderBottom: 1,
                  padding: "5px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                <Text>GRAND TOTAL</Text>
              </div>
              <div
                style={{
                  width: invoice.totalIGST !== 0 ? "354px" : "380px",
                  borderRight: 0,
                  borderBottom: 1,
                  padding: "5px",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                <Text>
                  {invoice.isUSDInvoice ? "USD : " : ""}
                  {
                    +(
                      +invoice.totalAmount +
                      (invoice.totalCGST ? +invoice.totalCGST : 0) +
                      (invoice.totalSGST ? +invoice.totalSGST : 0) +
                      (invoice.totalIGST ? +invoice.totalIGST : 0)
                    ).toFixed(2)
                  }
                </Text>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  width: invoice.totalIGST !== 0 ? "200px" : "175px",
                  borderRight: 1,
                  // borderBottom: 1,
                  padding: "5px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                <Text>IN WORDS</Text>
              </div>
              <div
                style={{
                  width: invoice.totalIGST !== 0 ? "354px" : "380px",
                  borderRight: 0,
                  // borderBottom: 1,
                  padding: "5px",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "10px",
                }}
              >
                <Text>
                  {numberToWords
                    .toWords(
                      +invoice.totalAmount +
                        (invoice.totalCGST ? +invoice.totalCGST : 0) +
                        (invoice.totalSGST ? +invoice.totalSGST : 0) +
                        (invoice.totalIGST ? +invoice.totalIGST : 0)
                    )
                    .toUpperCase()}
                </Text>
              </div>
            </div>
          </View>
          <View style={styles.signatureSection}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  width: invoice.totalIGST !== 0 ? "200px" : "175px",
                  borderRight: 1,
                  borderBottom: 1,
                  fontSize: "10px",
                  padding: "5px",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>BANK DETAILS: </Text>

                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>Bank</Text>
                  <Text>: HDFC Bank</Text>
                </View>
                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>Branch</Text>
                  <Text>: Tuticorin Branch</Text>
                </View>
                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>A/C #</Text>
                  <Text>: 50200077550144</Text>
                </View>
                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>IFSC</Text>
                  <Text>: HDFC0001104</Text>
                </View>
                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>SWIFT</Text>
                  <Text>: HDFCINBBCHE</Text>
                </View>
                <View style={styles.bankDetails}>
                  <Text style={{ width: "50px" }}>MICR</Text>
                  <Text>: 628240002</Text>
                </View>
              </div>
              <div
                style={{
                  fontSize: "10px",
                  textAlign: "right",
                  borderBottom: 1,
                }}
              >
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "12px",
                    fontWeight: 600,
                    height: "75px",
                    width: invoice.totalIGST !== 0 ? "345px" : "375px",
                    paddingTop: "5px",
                  }}
                >
                  <Text>GRACE GLOBAL LOGISTICS SOLUTION</Text>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "11px",
                    width: invoice.totalIGST !== 0 ? "345px" : "375px",
                  }}
                >
                  <Text>AUTHORIZED SIGNATORY </Text>
                </div>
              </div>
            </div>
          </View>
          <View style={styles.footerSection}>
            <Text style={{ fontWeight: 600 }}>TERMS & CONDITIONS: </Text>
            <Text style={styles.textIndent}>
              * Payments to be made by Cheque/DD/NEFT/RTGS favouring "Grace
              Global Logistics Solution".
            </Text>
            <Text style={styles.textIndent}>
              * Payments to be made as per the final total of the invoice
              without any deduction.
            </Text>
            <Text style={styles.textIndent}>
              * Please provide us with the payment details after the completion
              of fund transfer.
            </Text>
            <Text style={styles.textIndent}>
              * Incase of any discrepancy, please revert within 7 days from
              receipt, failing which invoice will be deemed to be correct and
              payable in full.
            </Text>
          </View>
        </Page>
      </Document>
    )
  );
};

export default PrintInvoice;
