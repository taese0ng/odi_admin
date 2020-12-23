import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  modifyStory(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/story/modify', body, headers);
  },
});
