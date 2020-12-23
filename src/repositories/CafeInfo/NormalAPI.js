import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  getCafeInfo(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/search', body, headers);
  },

  registerCafe(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/register', body, headers);
  },

  modifyCafe(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/modify', body, headers);
  },

  getImage(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.get('/api/normal/get_image', body, headers);
  },

  setCoupon(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/coupon', body, headers);
  },
});
