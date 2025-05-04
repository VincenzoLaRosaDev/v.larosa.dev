import axios from 'axios';

const axiosAuth = () => {
  const defaultOptions = {
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (config) => {
    // config.headers.Authorization = `Bearer ${session?.user.auth_token}`;
    return config;
  });

  return instance;
};

export default axiosAuth();
