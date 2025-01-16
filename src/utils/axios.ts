import axios from "axios";

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});

export const apiInterceptor = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});

apiInterceptor.interceptors.response.use(
  (response) => {
    const totalCount = response.headers['x-count-total'];
    if (totalCount) {
      response.data.totalCount = totalCount;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
