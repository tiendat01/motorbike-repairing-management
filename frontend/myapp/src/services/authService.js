import axios from "axios";
import { menuAPI } from "../constants/const";

export const authService = {
  loginMethod: function (values) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    return axios.post(menuAPI.login, JSON.stringify(values), config);
  },
};
