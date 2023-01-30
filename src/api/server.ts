import axios from "axios";
import Swal from "sweetalert2";
import { history } from "../utils/history";

//  GET FROM ENV
const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const server = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
});

server.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    if (
      (error.response &&
        error.response.status &&
        error.response.status === 401) ||
      error?.response?.data?.error === "invalid token"
    ) {
      /*Redirect to SignIn */
      history.replace("signin");
      localStorage.removeItem("token");
      Swal.fire("Unauthorized !!", "", "error");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { server };
