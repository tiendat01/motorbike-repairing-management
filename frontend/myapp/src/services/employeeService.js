import axios from "axios";
import { menuAPI } from "../constants/const";
import { getAuthorizationHeader } from "./axiosClient";

export const employeeService = {
  listAll: function () {
    return axios.get(menuAPI.employee, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listInPage: function (page, size) {
    return axios.get(`${menuAPI.employee}/paging?page=${page}&size=${size}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  create: function (employee) {
    return axios.post(`${menuAPI.employee}`, JSON.stringify(employee), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getOne: function (id) {
    return axios.get(`${menuAPI.employee}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (id) {
    return axios.delete(`${menuAPI.employee}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  update: function (id, values) {
    return axios.put(`${menuAPI.employee}/${id}`, JSON.stringify(values), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  search: function (searchParams) {
    return axios.get(`${menuAPI.employee}/f?search=${searchParams}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getTickets: function (id) {
    return axios.get(`${menuAPI.employee}/${id}/tickets`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  deleteMulti:function(data){
    return axios({
      method: 'delete',
      url: 'http://localhost:8080/v1/employees/delete_multi',
      headers: { 
        'Authorization': getAuthorizationHeader(),
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
    })
  }
};
