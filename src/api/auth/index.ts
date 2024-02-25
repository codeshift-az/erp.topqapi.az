import axios from "@/api";

// URLs
import * as URL from "./urls";

export const postLogin = (data: FormData) =>
  axios.post(URL.LOGIN_URL, data).then((response) => response.data);

export const postRefreshToken = (data: FormData) =>
  axios.post(URL.REFRESH_TOKEN_URL, data).then((response) => response.data);

export const postVerifyToken = (data: FormData) =>
  axios.post(URL.VERIFY_TOKEN_URL, data).then((response) => response.data);

export const postLogout = (data: FormData) => axios.post(URL.LOGOUT_URL, data);
