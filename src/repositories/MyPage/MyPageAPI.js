import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

const accessToken = Cookies.get('access_token');
const headers = { headers: { Authorization: accessToken } };

export default ({
  getUserInfo() {
    return axios.post('/api/normal/user_info', {}, headers);
  },

  checkPassword(body) {
    return axios.post('/auth/check_data', body, headers);
  },

  changePassword(body) {
    return axios.post('/auth/login/change_password', body, headers);
  },

  removeAccount() {
    return axios.post('/auth/login/delete_account', headers);
  },

  modifyUser(body) {
    return axios.post('/auth/modify_user', body, headers);
  },
});
