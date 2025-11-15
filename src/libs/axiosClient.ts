import axios from 'axios';
import { toast } from 'sonner';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add user authentication
axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    toast.error('Request failed to send');
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors and show toasts
axiosClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    console.error('Response error:', error);

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Extract error message from API response
      const errorMessage = data?.error?.message || data?.message || 'An error occurred';

      if (status === 401) {
        toast.error('Unauthorized: Please check your credentials');
        window.location.href = '/sign-in';
        return Promise.reject(error);
      }

      switch (status) {
        case 400:
          toast.error(`Bad Request: ${errorMessage}`);
          break;
        case 403:
          toast.error('Forbidden: You don\'t have permission to perform this action');
          break;
        case 404:
          toast.error('Not Found: The requested resource doesn\'t exist');
          break;
        case 409:
          toast.error(`Conflict: ${errorMessage}`);
          break;
        case 422:
          toast.error(`Validation Error: ${errorMessage}`);
          break;
        case 429:
          toast.error('Too Many Requests: Please try again later');
          break;
        case 500:
          toast.error('Internal Server Error: Something went wrong on our end');
          break;
        case 502:
          toast.error('Bad Gateway: Service temporarily unavailable');
          break;
        case 503:
          toast.error('Service Unavailable: Please try again later');
          break;
        default:
          toast.error(`Error ${status}: ${errorMessage}`);
      }
    } else if (error.request) {
      // Network error or request timeout
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout: The server took too long to respond');
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error: Please check your internet connection');
      } else {
        toast.error('Network error: Unable to reach the server');
      }
    } else {
      // Something else happened
      toast.error('Unexpected error occurred');
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
