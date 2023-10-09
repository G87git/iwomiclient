import axios from "axios";

const apiClient = ({ method, url, body }) => {
  axios.defaults.baseURL = "http://192.168.100.123:8081/api/v2/";
  // axios.defaults.baseURL = "http://57.128.163.118:8081/api/v2/";

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") ??
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMzc2Nzc1MzAzMTgiLCJpYXQiOjE2OTY4NTg0MzksImV4cCI6MTY5NzAwMjQzOX0.eiPZVHoDbgSQcApVjnuht9gYHmUFj3Nl13UekvBwF-c",
  };

  return axios({ method, url, data: body });
};

export default apiClient;
