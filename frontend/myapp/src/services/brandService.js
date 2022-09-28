import axios from "axios";
import { menuAPI } from "../constants/const";
import { getAuthorizationHeader } from "./axiosClient";

export const brandService = {
  listAll: function () {
    return axios.get(menuAPI.brand, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listInPage: function (page, size) {
    return axios.get(`${menuAPI.brand}/paging?page=${page}&size=${size}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getOne: function (id) {
    return axios.get(`${menuAPI.brand}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (id) {
    return axios.delete(`${menuAPI.brand}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
};
