import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// store.js
export const store = new Vuex.Store({
  state: {
    loginName: Cookies.get('userNickName'),
    isLogin: !!Cookies.get('access_token'),
  },
  
  mutations: {
    setLoginName(state, payload) {
      state.loginName = payload.name;
      state.isLogin = payload.value;
    },
  },

  getters: {
    getLoginInfo(state) {
      return { name: state.loginName, isLogin: state.isLogin };
    },
  },
});

export default store;
