import axios from 'src/utils/axiosUtils';
// import { Cookies } from 'quasar';

// const accessToken = Cookies.get('access_token');
// const headers = { headers: { Authorization: accessToken } };

export default ({
  login(body) {
    return axios.post('/auth/login', body);
  },
});
