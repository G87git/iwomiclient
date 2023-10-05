import axios from "axios";

const apiClient = ({ method, url, body }) => {
  axios.defaults.baseURL = "http://192.168.100.123:8081/api/v2/"
  // axios.defaults.baseURL = "http://57.128.163.118:8081/api/v2/";

  axios.defaults.headers= { 
    // 'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTY3ODM0NTYiLCJpYXQiOjE2OTY0MDk2ODksImV4cCI6MTY5NjU1MzY4OX0.Njt75RSICcxj65OUpcnCI8k-IilxdgfbcfuBwOgnqUs", 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}
  return axios({ method, url, data: body });
};

export default apiClient;
