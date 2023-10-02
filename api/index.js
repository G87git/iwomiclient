import axios from "axios";

const apiClient = ({ method, url, body }) => {
  axios.defaults.baseURL = "http://192.168.100.123:8081/api/v2/"
  // axios.defaults.baseURL = "http://57.128.163.118:8081/api/v2/";

  axios.defaults.headers= { 
    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTY3ODM0NTYiLCJpYXQiOjE2OTYyNDAxOTYsImV4cCI6MTY5NjM4NDE5Nn0.ECCrj03o3KJEbNvN29spZ4l6dlA13va2irs-7VKk3F8', 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}
  return axios({ method, url, data: body });
};

export default apiClient;
