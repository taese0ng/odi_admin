import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

const accessToken = Cookies.get('access_token');
const headers = { headers: { Authorization: accessToken } };

export default ({
  getCafeSrl() {
    return axios.post('/api/cafe/list_search_business', {}, headers);
  },

  getUserInfo() {
    return axios.post('/api/normal/user_info', {}, headers);
  },
});
