import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  getStoryList(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/story/search', body, headers);
  },

  deleteStory(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken } };
    return axios.post('/api/cafe/story/delete', body, headers);
  },
});
