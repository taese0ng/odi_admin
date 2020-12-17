import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import { Cookies } from 'quasar';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// 인증이 필요한 route name 을 가진 배열
const routeNameAuth = ['myPage',
  'cafeNormalInfo', 'statistics', 
  'cafeStoryUpload', 'cafeStoryList', 
  'cafeStoryDetail', 'reviewList'];

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  // 전역 vue rotuer navigation guard
  Router.beforeEach((to, from, next) => {
    if(routeNameAuth.includes(to.name)) {
      console.log(to.name);
      if(Cookies.get('access_token')) {
        return next(true);
      } else {
        console.log('여기');
        store.commit('setLoginName', { name: '', value: false });
        return next({ name: 'login' });
      }
    }

    return next(true);
  });

  return Router;
}
