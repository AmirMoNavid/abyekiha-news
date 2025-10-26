import { ToastPosition } from 'react-toastify';
import axios from 'axios';

import { getCookie } from 'cookies-next';

const token = getCookie('refreshToken');

export const toastConfig = {
  position: 'bottom-center',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.abyekiha.ir'
      : 'http://localhost:5000',
  withCredentials: true,
  ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
});
