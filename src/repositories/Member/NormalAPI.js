import axios from 'src/utils/axiosUtils';
// import { Cookies } from 'quasar';

// const accessToken = Cookies.get('access_token');
// const headers = { headers: { Authorization: `Bearer ${accessToken}` } };

// Normal User CRUD 기능
export default ({
  addUser(data) {
    return axios.post('/user', data);
  },

  getUsers(queryString) { // user list 불러오기
    return axios.get(`/user?${queryString}`);
  },

  getUser(id) {
    return axios.get(`/user/${id}`);
  },
});
