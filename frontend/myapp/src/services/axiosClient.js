import axios from "axios";

const getToken = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

export const getAuthorizationHeader = () => {
  return `Bearer ${getToken()}`;
};

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

export default axiosClient;
