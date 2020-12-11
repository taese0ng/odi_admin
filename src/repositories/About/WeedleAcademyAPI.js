import axios from 'src/utils/axiosUtils';
// import { Cookies } from 'quasar';

// const accessToken = Cookies.get('access_token');
// const headers = { headers: { Authorization: `Bearer ${accessToken}` } };

// About WeedleAcademy CRUD 기능
export default ({
  readContents() {
    return axios.get('/v3/contents');
  },

  saveContents(data) { // client 추가
    return axios.post('/v3/contents', data);
  },
});
