import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  getImage(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.get('/api/normal/get_image', body, headers);
  },
});
