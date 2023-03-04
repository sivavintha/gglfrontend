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

import logo from "../../../Assets/Images/logo.jpeg";

//fonts
import Roboto from "../../../Assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "../../../Assets/fonts/Roboto/Roboto-Bold.ttf";

import Calibri from "../../../Assets/fonts/Calibri/calibri.ttf";
import CalibriBold from "../../../Assets/fonts/Calibri/calibrib.ttf";

interface IPrintContract {
  contract: any;
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
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
  },
  contractNoSection: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    fontSize: "12px",
    fontWeight: 600,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
  },
  buyerSection: {
    marginLeft: 20,
    marginRight: 20,
    // padding: 5,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
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
    paddingLeft: "40px",
  },
  headingText: {
    marginTop: "3px",
    paddingLeft: "40px",
    fontWeight: 600,
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
    padding: 5,
    fontSize: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderTopWidth: 0,
    height: "125px",
  },
  flexSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: "170px",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: "black",
    padding: "10px",
  },
});

const PrintContract: React.FC<IPrintContract> = ({ contract }) => {
  return (
    contract && (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>GGL</Text>
          </View>
          {/* <View style={styles.contractNoSection}></View> */}
          <View style={styles.buyerSection}>
            <div style={styles.flexSpaceBetween}>
              <div
                style={{
                  padding: "5px",
                  marginTop: "10px",
                }}
              >
                <Text style={{ fontWeight: 600 }}>BUYER: </Text>
                <Text style={styles.headingText}>{contract.buyer.name},</Text>
                {contract.buyer.address1 && (
                  <Text style={styles.textIndent}>
                    {contract.buyer.address1},
                  </Text>
                )}
                {contract.buyer.address2 && (
                  <Text style={styles.textIndent}>
                    {contract.buyer.address2},
                  </Text>
                )}
                {contract.buyer.city && (
                  <Text style={styles.textIndent}>{contract.buyer.city},</Text>
                )}
                {contract.buyer.zipcode && (
                  <Text style={styles.textIndent}>
                    {contract.buyer.state} {contract.buyer.zipcode},
                  </Text>
                )}
                {contract.buyer.country && (
                  <Text style={styles.textIndent}>
                    {contract.buyer.country}
                  </Text>
                )}

                {contract.buyer.gstInNumber && (
                  <Text style={styles.textIndent}>
                    GSTIN: {contract.buyer.gstInNumber}
                  </Text>
                )}
              </div>
              <div style={styles.imageContainer}>
                <Image
                  src={logo}
                  style={{ height: "102px", width: "150px" }}
                ></Image>

                <Text>
                  CONTRACT #: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {contract?.code}
                </Text>
                <Text>
                  DATE:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {moment().format("DD/MM/YYYY")}
                </Text>
              </div>
            </div>
          </View>
          <View style={styles.contentSection}>
            <Text>
              We confirm having this day sold to you the following goods as per
              the terms and conditions hereunder,
            </Text>

            <View style={styles.commoditySection}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Commodity:{" "}
                </Text>

                <Text>{contract.commodity.commodityName}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Origin:{" "}
                </Text>

                <Text>{contract.origin?.originName || ""}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Quantity:{" "}
                </Text>

                <Text>{contract.quantity}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Packing:{" "}
                </Text>

                <Text>{contract.packing}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Price:{" "}
                </Text>

                <Text>{contract.rate}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Delivery @:{" "}
                </Text>

                <Text>{contract.cargoLocation}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "start",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Quality:{" "}
                </Text>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "3px",
                    }}
                  >
                    <Text
                      style={{
                        width: "70px",
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      Outturn:
                    </Text>
                    <Text>{contract.outTurn}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "3px",
                    }}
                  >
                    <Text
                      style={{
                        width: "70px",
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      Nut Count:
                    </Text>
                    <Text>{contract.nutCount}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "3px",
                    }}
                  >
                    <Text
                      style={{
                        width: "70px",
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      Moisture:
                    </Text>
                    <Text>{contract.moisture}</Text>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Payment Terms:
                </Text>

                <Text>{contract.paymentTerms}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "top",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Shipment Advice:
                </Text>

                <Text>{contract.shipmentAdvice}</Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "top",
                  padding: "3px",
                }}
              >
                <Text
                  style={{
                    width: "200px",
                    textAlign: "left",
                    paddingLeft: "40px",
                    fontWeight: 600,
                  }}
                >
                  Remarks:
                </Text>

                <Text>{contract.remarks}</Text>
              </div>
            </View>
          </View>
          <View style={styles.section}>
            <Text>BANK: </Text>
            <Text style={styles.headingText}>
              {contract.accountDetails.bankName}
            </Text>
            <Text style={styles.textIndent}>
              {contract.accountDetails.bankBranch}
            </Text>
            <Text style={styles.textIndent}>
              IFSC Code: {contract.accountDetails.ifscCode}
            </Text>
            <Text style={styles.textIndent}>
              In favour of: {contract.accountDetails.accountName}
            </Text>
            <Text style={styles.textIndent}>
              A/C #: {contract.accountDetails.accountNumber}
            </Text>
          </View>

          <View style={styles.signatureSection}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px",
                fontWeight: 600,
              }}
            >
              <Text>CONFIRMED BY SELLER</Text>
              <Text>CONFIRMED BY BUYER</Text>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px",
                fontSize: "10px",
              }}
            >
              <Text>For {contract.seller.name}</Text>
              <Text>For {contract.buyer.name}</Text>
            </div>
          </View>

          <View>
            <div style={styles.footer}>
              <Text style={styles.textCenter}>
                #: 93C/83C, 2ND STREET, RAJIV NAGAR, THOOTHUKUDI - 628008
              </Text>
              <Text style={styles.textCenter}>GSTN #: 33BLKPM7071H2ZW</Text>
              <Text style={styles.textCenter}>CONTACT: +91 9629766500</Text>
            </div>
          </View>
        </Page>
      </Document>
    )
  );
};

export default PrintContract;
