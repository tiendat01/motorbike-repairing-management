import { menuAPI } from "../constants/const";
import axiosClient, { getAuthorizationHeader } from "./axiosClient";

export const ticketService = {
  listAll: function () {
    return axiosClient.get(menuAPI.ticket, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listInPage: function (page, size) {
    return axiosClient.get(
      `${menuAPI.ticket}/paging?page=${page}&size=${size}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: getAuthorizationHeader(),
        },
      }
    );
  },
  getOne: function (id) {
    return axiosClient.get(`${menuAPI.ticket}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (id) {
    return axiosClient.delete(`${menuAPI.ticket}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  create: function (ticket) {
    return axiosClient.post(`${menuAPI.ticket}`, JSON.stringify(ticket), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  update: function (id, ticket) {
    return axiosClient.put(`${menuAPI.ticket}/${id}`, JSON.stringify(ticket), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  search: function (searchParams) {
    return axiosClient.get(`${menuAPI.ticket}/f?search=${searchParams}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  searchInPage: function (searchParams, page, size) {
    return axiosClient.get(
      `${menuAPI.ticket}/f/p?page=${page}&size=${size}&search=${searchParams}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: getAuthorizationHeader(),
        },
      }
    );
  },
  trackStatus: function (id) {
    return axiosClient.get(`${menuAPI.ticketUpdateTrack}/ticket/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
};
