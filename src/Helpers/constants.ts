let Constants: any;
let url = "http://localhost:3000/";


if (process.env.NODE_ENV === "production") {
  Constants = {
    API_URL: url + "api/",
    IMAGE_URL: url,
  };
} else {
  Constants = {
    API_URL: url + "api/",
    IMAGE_URL: url,
  };
}

export default Constants;
