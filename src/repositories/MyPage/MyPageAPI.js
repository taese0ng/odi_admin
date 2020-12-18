import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  getUserInfo() {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/normal/user_info', {}, headers);
  },

  checkPassword(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/auth/check_data', body, headers);
  },

  changePassword(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/auth/login/change_password', body, headers);
  },

  removeAccount() {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/auth/login/delete_account', {}, headers);
  },

  modifyUser(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/auth/modify_user', body, headers);
  },
});
