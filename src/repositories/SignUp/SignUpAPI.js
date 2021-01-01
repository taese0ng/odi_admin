import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  signup(body) {
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.post('/auth/register', body, option);
  },

  checkID(body) {
    return axios.post('/auth/check_data', body);
  },
});
