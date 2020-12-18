import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

const accessToken = Cookies.get('access_token');
const headers = { headers: { Authorization: accessToken } };

export default ({
  getStatistics(body) {
    return axios.post('/api/cafe/statistics', body, headers);
  },
});
