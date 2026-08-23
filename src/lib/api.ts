import axios from "axios";

import { clearSession, getAccessToken } from "./auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token has expired (or is otherwise rejected), drop the session and
// send the user straight back to the login page — except for the login
// request itself, where a 401 just means "wrong credentials".
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url: string = error.config?.url ?? "";
    const isLoginRequest = url.includes("/auth/login/");

    if (status === 401 && !isLoginRequest && typeof window !== "undefined") {
      clearSession();
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);
