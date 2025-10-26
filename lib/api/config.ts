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

          const persistedState = localStorage.getItem("persist:root");
           console.log('persistedState',persistedState);
           
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);