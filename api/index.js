import axios from "axios";
const apiClient = ({ method, url, body }) => {
  axios.defaults.baseURL = "/api"
  axios.defaults.headers = {
    "Context-Type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Accept: "application/json",
    Authorization: localStorage.getItem("token")
  };
  return axios({ method, url, data: body });
};
export default apiClient;
