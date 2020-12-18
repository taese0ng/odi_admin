import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  getCafeSrl() {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/list_search_business', {}, headers);
  },

  getUserInfo() {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/normal/user_info', {}, headers);
  },
});
