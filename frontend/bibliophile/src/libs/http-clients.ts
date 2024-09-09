import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

dotenv.config();

const createClientInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL as string,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.CLIENT_URL as string,
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  });
};

// TODO: 필요할 때 주석 해제 후 사용 예정
// const createAuthClientInstance = () => {
//     const accessToken = sessionStorage.getItem("accessToken");
//
//     const instance = axios.create({
//         baseURL: import.meta.env.VITE_REST_API_URL,
//         timeout: 5000,
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`,
//             "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
//             "Access-Control-Allow-Credentials": "true",
//         },
//         withCredentials: true,
//     });
//
//     return instance;
// };

// const createAuthWithRefreshClientInstance = () => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     const refreshToken = Cookies.get("refreshToken");
//
//     const instance = axios.create({
//         baseURL: import.meta.env.VITE_REST_API_URL,
//         timeout: 5000,
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`,
//             "Authorization-refresh": `Bearer ${refreshToken}`,
//             "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
//             "Access-Control-Allow-Credentials": "true",
//         },
//         withCredentials: true,
//     });
//
//     return instance;
// };

export const clientInstance = createClientInstance();
// export const authClientInstance = createAuthClientInstance();
// export const authWithRefreshClientInstance = createAuthWithRefreshClientInstance();
