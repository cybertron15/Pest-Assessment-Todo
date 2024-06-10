import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getAccessToken, setAccessToken, getRefreshToken, removeTokens, isTokenExpired } from './tokenUtils';
const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_API,  // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      try {
        const response: AxiosResponse<{ access: string }> = await axios.post(`${BACKEND_API}/token/refresh/`, {
          refresh: getRefreshToken(),
        });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        token = newAccessToken;
      } catch (error) {
        removeTokens();
        window.location.href = '/login';
        throw error;  // Ensure the request fails if token refresh fails
      }
    }

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();  // Ensure headers exist
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

export default axiosInstance;
