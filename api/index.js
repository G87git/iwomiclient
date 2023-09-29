import axios from "axios";
const apiClient = ({ method, url, body }) => {
  // axios.defaults.baseURL = "http://192.168.100.123:8081/api/v2/"
  axios.defaults.baseURL = "http://57.128.163.118:8081/api/v2/"
  axios.defaults.headers = {
    "Context-Type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Accept: "application/json",
    // Authorization: localStorage.getItem("token")
    Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTY3ODM0NTYiLCJpYXQiOjE2OTYwMDc0NTIsImV4cCI6MTY5NjE1MTQ1Mn0.UZoxUvdcSEW80mRUXHGrTcDIccFmtbIQ3oYJ7kUwLt8"
  };
  return axios({ method, url, data: body });
};
export default apiClient;
