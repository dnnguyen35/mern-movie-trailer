import axios from "axios";
import queryString from "query-string";
import store from "../../redux/store";

const baseURL = process.env.REACT_APP_API_URL;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  const languageMode = store.getState().languageMode.languageMode || "en";

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": languageMode,
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
