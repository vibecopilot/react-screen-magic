import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://13.215.74.38",
  
  // baseURL: "http://localhost:3000",
  
  baseURL: "https://app.myciti.life"

});
 
const Token = localStorage.getItem("TOKEN");

axiosInstance.interceptors.request.use(
  (authenticate) => {
    const token = Token;
    if (token) {
      authenticate.headers["Authorization"] = `${token}`;
    }
    return authenticate;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;