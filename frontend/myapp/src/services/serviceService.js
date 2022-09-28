import axios from "axios";
import { menuAPI } from "../constants/const";
import { getAuthorizationHeader } from "./axiosClient";

export const serviceService = {
  listAll: function () {
    return axios.get(menuAPI.service, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listInPage: function (page, size) {
    return axios.get(`${menuAPI.service}/paging?page=${page}&size=${size}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getOne: function (id) {
    return axios.get(`${menuAPI.service}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (id) {
    return axios.delete(`${menuAPI.service}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  create: function (service) {
    return axios.post(`${menuAPI.service}`, JSON.stringify(service), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  update: function (id, values) {
    return axios.put(`${menuAPI.service}/${id}`, JSON.stringify(values), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  search: function (searchParams) {
    return axios.get(`${menuAPI.service}/f?search=${searchParams}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  deleteMulti:function(data){
    return axios({
      method: 'delete',
      url: 'http://localhost:8080/v1/services/delete_multi',
      headers: { 
        'Authorization': getAuthorizationHeader(),
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
    })
  }
};
