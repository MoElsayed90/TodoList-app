import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://todolist-app-server.onrender.com/api/',
  timeout: 1000,

});

export default axiosInstance

