// import { enf_conf } from "@/config/env.config";
import axios from "axios";

export const axios_instance = axios.create({
  baseURL: "",
  withCredentials: true,
});

// axios_instance.interceptors.request.use(
//   (config) => {
//     const session = localStorage.getItem("session");
//     if (session) {
//       config.headers["x-auth-token"] = session;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axios_instance;
