import { store } from '@/store/store';
import axios from 'axios';


export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  // timeout: 1000,
});

api.interceptors.request.use(
  (config) => {

    const persistedState: any = localStorage.getItem("persist:root");
    const parsedState = JSON.parse(persistedState);
    const data = JSON.parse(parsedState.userData);
    const accessToken = data?.user?.data?.accessToken; 
    // console.log('data', data.user.data.accessToken);
    console.log('config', config);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // store.dispatch(logout());
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );