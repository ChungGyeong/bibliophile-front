import axios from "axios";

const createAxiosInstance = (config = {}) => {
  const defaultConfig = {
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  };

  return axios.create({ ...defaultConfig, ...config });
};

const clientInstance = createAxiosInstance();

export { clientInstance };
