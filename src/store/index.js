import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';
import API from 'src/repositories/Store/StoreAPI';

Vue.use(Vuex);
// store.js
export const store = new Vuex.Store({
  state: {
    businessName: null,
    isLogin: !!Cookies.get('access_token'),
    cafeSrl: null,
    cafeName: 'odiAdmin',
  },
  
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload.value;
    },
    setBusinessName(state, payload) {
      state.businessName = payload.business_nick_name;
    },
    setCafeSrl(state, payload) {
      state.cafeSrl = payload.cafe_srl;
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
    getCafeSrl(state) {
      return state.cafeSrl;
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
