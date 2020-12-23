import axios from 'axios';

const BASE_API_URL = 'https://cafeodi.co.kr';
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 2500,
  // headers:{
  //   Authorization: token
  // }
});

const CANCEL_TOKEN = axios.CancelToken;
export const SOURCE = CANCEL_TOKEN.source();

// axios interceptor
const requestHandler = (config) => {
  return config;
};

const responseHandler = (response) => {
  // console.log('error: ', response.response);
  if(response.status === 400) {
    return Promise.reject(response);
  }
  if(response.status === 500) {
    return Promise.reject(response);
  }

  return response;
};

const responseErrorHandler = (error) => {
  // console.log('error:', error.response);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (config) => requestHandler(config),
  (response) => responseHandler(response),
  (error) => responseErrorHandler(error),
);

export default axiosInstance;
