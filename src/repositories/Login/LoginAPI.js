import axios from 'src/utils/axiosUtils';

export default ({
  login(body) {
    return axios.post('/auth/login', body);
  },
});
