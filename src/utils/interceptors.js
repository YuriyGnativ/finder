import { getToken, setToken, removeToken } from "./tokenApi";

export const interceptor = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      const token =
        getToken() ||
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InBzZSIsImV4cCI6MTY1MjE3NDg1OH0.YKJ2Ymg3QSuBTWLfXqszc7YxLowszYu30d0uZbcWGxk";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const token = response?.data?.token || response.data.data.token || null;
      if (token) {
        removeToken();
        setToken(token);
      }
      return response;
    },
    function (error) {
      if (error.response.status === 403 || error.response.status === 410) {
        // removeToken();
      }
      return Promise.reject(error);
    }
  );
};
