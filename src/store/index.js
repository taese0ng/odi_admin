import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';
import API from 'src/repositories/Store/StoreAPI';

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
    businessName: null,
    isLogin: !!Cookies.get('access_token'),
    cafeSrl: null,
    cafeName: null,
  },
  
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload.value;
    },
    setBusinessName(state, payload) {
      state.businessName = payload.business_nick_name;
    },
    setCafeSrl(state, payload) {
      state.cafeStr = payload.cafe_srl;
      state.cafeName = payload.cafe_name;
    },
  },

  getters: {
    getLoginInfo(state) {
      return state.isLogin;
    },

    getBusinessName(state) {
      return state.businessName;
    },

    getCafeName(state) {
      return state.cafeName;
    },
  },

  actions: {
    async dispatchGetSrl({ commit, dispatch, getters, state }, payload) {
      const apiResult = await API.getCafeSrl();
      // console.log(apiResult);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        commit('setCafeSrl', apiResult.data.result[0]);
      }
    },

    async dispatchGetUserInfo({ commit, dispatch, getters, state }, payload) {
      const apiResult = await API.getUserInfo();
      // console.log('userInfo: ', apiResult);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        commit('setBusinessName', apiResult.data);
      }
    },
  },
});

export default store;
