import axios from "axios";
import config from "./config";
const PostData = ({ method, url, body, baseURL }, call, getProgress) => {
  axios.defaults.baseURL = config.baseUrl
  
  axios.defaults.headers = {
    "Context-Type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Accept: "application/json",
  };
  axios({ method, url, data: body, onDownloadProgress: getProgress })
    .then((res) => {
      call(res.data);
    })
    .catch((e) => {
      call("Error", e);
    });
};
export default PostData;