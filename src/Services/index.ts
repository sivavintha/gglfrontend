import axios from "axios";
import moment from "moment";
import Constants from "../Helpers/constants";

const Api = (
  uri: string,
  method: any,
  postData: any,
  headers: any = null,
  authEnabled: boolean = false
) => {
  let postUrl = Constants.API_URL + uri;
  let headerData = headers ? headers : { "Content-Type": "application/json" };
  const authExists = window.localStorage.getItem("auth");

  const auth = authExists ? JSON.parse(authExists) : {};

  if (authEnabled && auth && auth.token !== undefined && auth.token !== null) {
    const token = auth.token;
    // Validate Expiry Time
    const expiryTime = moment(auth.exp).unix();
    const now = moment().unix();
    if (now < expiryTime) {
      if (typeof token !== "undefined" && token !== null && token !== "") {
        headerData.Authorization = token;
      }
    } else {
      setTimeout(() => {
        window.localStorage.clear();
        // History.push("/login");
      }, 3000);
    }
  }
  return new Promise((resolve, reject) => {
    axios({
      url: postUrl,
      method: method,
      data: postData ? postData : {},
      headers: headerData,
    })
      .then((res) => {
        // On Success
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        // On Error
        reject(error);

        console.log("api error ===>", error.response.request.status);

      });
  });
};

export default Api;
