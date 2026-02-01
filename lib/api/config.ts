import { setAccessToken, setUser } from '@/store/slice/userSlice';
import axios from 'axios';

let appStore: any = null;
export const setAppStore = (s: any) => { appStore = s };

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  // timeout: 1000,
});

  // request interceptor

api.interceptors.request.use((config) => {
  const state = appStore?.getState();
  const accessToken = state?.userData?.accessToken;
  
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


// response instancerceptor

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  res => {
    return res;
  },
  async (error) => {
    console.log('API error response:', error);
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/user/refresh-token");

        const newAccessToken =
          res.data?.accessToken ||
          res.headers["x-new-access-token"];

        if (!newAccessToken) throw new Error("No token");

        appStore?.dispatch(setAccessToken(newAccessToken));

        api.defaults.headers.Authorization =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return api(originalRequest);

      } catch (err) {
        processQueue(err, null);
        appStore?.dispatch(setUser(null));
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

