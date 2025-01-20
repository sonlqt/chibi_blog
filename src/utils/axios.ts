import axios from "axios";


const token = "453a66fe81f87affd09e46bc876adf54556c423dc4d60ea0fdd32edef5620c9b";


export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Authorization: `Bearer ${token}`, 
  },
});

export const apiInterceptor = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});


apiInterceptor.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response) => {
    const nextPageUrl = response.headers["x-links-next"] || null;

    if (nextPageUrl) {
      response.data.nextPage = parseInt(new URL(nextPageUrl).searchParams.get("page") || "0", 10);
    } else {
      response.data.nextPage = null;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);