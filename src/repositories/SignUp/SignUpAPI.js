import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  signup(body) {
    const option = { headers: { 'content-type': 'multipart/form-data' } };
    return axios.post('/auth/register', body, option);
  },
});
