import axios from "axios";
import { menuAPI } from "../constants/const";
import { getAuthorizationHeader } from "./axiosClient";

export const productService = {
  listAll: function () {
    return axios.get(menuAPI.product, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listInPage: function (page, size) {
    return axios.get(`${menuAPI.product}/paging?page=${page}&size=${size}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getOne: function (id) {
    return axios.get(`${menuAPI.product}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (id) {
    return axios.delete(`${menuAPI.product}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  create: function (product) {
    return axios.post(`${menuAPI.product}`, JSON.stringify(product), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  update: function (id, product) {
    return axios.put(`${menuAPI.product}/${id}`, JSON.stringify(product), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  search: function (searchParams) {
    return axios.get(`${menuAPI.product}/f?search=${searchParams}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  deleteMulti:function(data){
    return axios({
      method: 'delete',
      url: 'http://localhost:8080/v1/products/delete_multi',
      headers: { 
        'Authorization': getAuthorizationHeader(),
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
    })
  }
};
