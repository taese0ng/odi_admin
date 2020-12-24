import axios from 'src/utils/axiosUtils';
import { Cookies } from 'quasar';

export default ({
  uploadStory(body) {
    const accessToken = Cookies.get('access_token');
    const headers = { headers: { Authorization: accessToken, 'Content-Type': 'multipart/form-data' } };
    return axios.post('/api/cafe/story/write', body, headers);
  },
});
