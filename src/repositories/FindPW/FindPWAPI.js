import axios from 'src/utils/axiosUtils';

export default ({
  changePassword(body) {
    return axios.post('/auth/login/change_password', body);
  },
});
